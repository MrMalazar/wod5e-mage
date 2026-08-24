$ErrorActionPreference = "Stop"

$projectRoot = [IO.Path]::GetFullPath((Join-Path $PSScriptRoot ".."))
$distDirectory = [IO.Path]::GetFullPath((Join-Path $projectRoot "dist"))
$stageDirectory = [IO.Path]::GetFullPath((Join-Path $distDirectory ".release-stage"))
$zipPath = Join-Path $distDirectory "wod5e-mage.zip"
$releaseManifestPath = Join-Path $distDirectory "module.json"

# Packaging replaces only the repository-local dist directory. Keep this guard
# next to the removal so a future path edit cannot broaden the deletion target.
$expectedDistDirectory = [IO.Path]::GetFullPath((Join-Path $projectRoot "dist"))
if ($distDirectory -ne $expectedDistDirectory -or (Split-Path $distDirectory -Leaf) -ne "dist") {
  throw "Refusing to clean an unexpected release directory: $distDirectory"
}

if (Test-Path -LiteralPath $distDirectory) {
  Remove-Item -LiteralPath $distDirectory -Recurse -Force
}

New-Item -ItemType Directory -Path $stageDirectory -Force | Out-Null

$runtimeEntries = @(
  "module.json",
  "assets",
  "lang",
  "scripts",
  "styles",
  "templates"
)

foreach ($entry in $runtimeEntries) {
  $sourcePath = Join-Path $projectRoot $entry
  if (-not (Test-Path -LiteralPath $sourcePath)) {
    throw "Required release entry is missing: $entry"
  }

  Copy-Item -LiteralPath $sourcePath -Destination $stageDirectory -Recurse -Force
}

# Ship the portable source databases only. Foundry migrates these legacy .db
# files to its local LevelDB directories on first load; runtime folders may
# contain a live LOCK file and must never be bundled in a release.
$packsSource = Join-Path $projectRoot "packs"
$packsDestination = Join-Path $stageDirectory "packs"
$packDatabases = @(Get-ChildItem -LiteralPath $packsSource -File -Filter "*.db")
if ($packDatabases.Count -eq 0) {
  throw "No compendium source databases were found in packs."
}

[IO.Directory]::CreateDirectory($packsDestination) | Out-Null
foreach ($database in $packDatabases) {
  Copy-Item -LiteralPath $database.FullName -Destination $packsDestination -Force
}

# Development-only files are useful in the repository but not at runtime.
$validatorPath = Join-Path $stageDirectory "scripts\validate-manifest.js"
if (Test-Path -LiteralPath $validatorPath) {
  Remove-Item -LiteralPath $validatorPath -Force
}

Get-ChildItem -LiteralPath $stageDirectory -Recurse -File -Filter ".gitkeep" |
  ForEach-Object { Remove-Item -LiteralPath $_.FullName -Force }

$manifest = Get-Content -LiteralPath (Join-Path $stageDirectory "module.json") -Raw |
  ConvertFrom-Json

if ($manifest.id -ne "wod5e-mage") {
  throw "Unexpected module id in release manifest: $($manifest.id)"
}

if (-not $manifest.manifest -or -not $manifest.download) {
  throw "The release manifest must define both manifest and download URLs."
}

Compress-Archive -Path (Join-Path $stageDirectory "*") -DestinationPath $zipPath -CompressionLevel Optimal
Copy-Item -LiteralPath (Join-Path $stageDirectory "module.json") -Destination $releaseManifestPath -Force

Add-Type -AssemblyName System.IO.Compression.FileSystem
$archive = [IO.Compression.ZipFile]::OpenRead($zipPath)
try {
  $archiveEntries = @($archive.Entries | ForEach-Object { $_.FullName.Replace("\", "/") })
  if ($archiveEntries -notcontains "module.json") {
    throw "The generated archive does not contain module.json at its root."
  }

  if ($archiveEntries | Where-Object { $_ -like "wod5e-mage/*" }) {
    throw "The generated archive contains an unwanted top-level module directory."
  }

  foreach ($packPath in @("packs/mage-spheres.db", "packs/mage-spheres-en.db")) {
    if ($archiveEntries -notcontains $packPath) {
      throw "The generated archive does not contain $packPath."
    }
  }
}
finally {
  $archive.Dispose()
}

Remove-Item -LiteralPath $stageDirectory -Recurse -Force

$zipHash = (Get-FileHash -LiteralPath $zipPath -Algorithm SHA256).Hash
Write-Host "Built wod5e-mage $($manifest.version) release assets:"
Write-Host "  $releaseManifestPath"
Write-Host "  $zipPath"
Write-Host "  SHA256 $zipHash"
