/**
 * Come si legge il Vathrâ (Blue, 25/9): la riga che un giocatore dice ad
 * alta voce senza sapere la lingua. Le regole sono quelle del capitolo
 * (01_DECISIONI/mondo/vathra_la_lingua.md, «Come suona»):
 *
 * - kh, sh, th contano come una consonante sola, e lo stacco ' pure;
 * - fra due vocali una consonante va con la sillaba dopo, due si dividono;
 * - le vocali piane che seguono una vocale stanno nella stessa sillaba,
 *   una vocale tenuta (â ê î ô û) ne apre sempre una nuova;
 * - l'accento va sull'ultima vocale tenuta della parola, e senza tenute sulla
 *   penultima sillaba; la sillaba accentata si scrive in maiuscolo;
 * - la grafia è all'italiana: kh → c (ch davanti a e, i), sh → sci/sc,
 *   th → t, y → i, le tenute con l'accento grave, lo stacco come ʼ.
 *
 * Scritte così, le regole rifanno una per una le 111 righe «come si legge»
 * di 05_TAVOLO/campagne/Vathra_cento_frasi.md (le controlla tests/vathra.test.js).
 *
 * Qui anche `perLaVoce`, dal traduttore di 03_FABBRICA: la riga riscritta
 * perché la voce italiana del computer la legga col ritmo giusto.
 */

const TENUTE = "âêîôû";
const PIANE = "aeiou";
const GRAVE = Object.freeze({ "â": "à", "ê": "è", "î": "ì", "ô": "ò", "û": "ù" });
const STACCO = "ʼ";
const APOSTROFI = /['’ʼ]/g;

/** La parola in segni: i digrafi kh, sh, th come un segno solo. */
function segni(parola) {
  const out = [];
  for (let i = 0; i < parola.length; i += 1) {
    const due = parola.substr(i, 2);
    if (due === "kh" || due === "sh" || due === "th") {
      out.push(due);
      i += 1;
      continue;
    }
    out.push(parola[i]);
  }
  return out;
}

const eVocale = (s) => s.length === 1 && (PIANE.includes(s) || TENUTE.includes(s));
const eTenuta = (s) => s.length === 1 && TENUTE.includes(s);

/** Le sillabe di una parola in romanizzazione (minuscola, lo stacco come '). */
export function sillabe(parola) {
  const seg = segni(String(parola ?? ""));
  const nuclei = [];
  for (let i = 0; i < seg.length; i += 1) {
    if (!eVocale(seg[i])) continue;
    const ultimo = nuclei[nuclei.length - 1];
    if (ultimo && ultimo[1] === i && !eTenuta(seg[i])) {
      ultimo[1] = i + 1;
      continue;
    }
    nuclei.push([i, i + 1]);
  }
  if (nuclei.length <= 1) return [seg.join("")];
  const tagli = [];
  for (let n = 1; n < nuclei.length; n += 1) {
    const da = nuclei[n - 1][1];
    const a = nuclei[n][0];
    tagli.push(a - da <= 1 ? da : da + 1);
  }
  const out = [];
  let prima = 0;
  for (const taglio of tagli) {
    out.push(seg.slice(prima, taglio).join(""));
    prima = taglio;
  }
  out.push(seg.slice(prima).join(""));
  return out;
}

/** Quale sillaba porta l'accento: l'ultima con una tenuta, se no la penultima; -1 per i monosillabi. */
export function sillabaAccentata(parti) {
  if (parti.length <= 1) return -1;
  for (let i = parti.length - 1; i >= 0; i -= 1) {
    if ([...parti[i]].some((c) => TENUTE.includes(c))) return i;
  }
  return parti.length - 2;
}

function allItaliana(sillaba) {
  return sillaba
    .replace(/[âêîôû]/g, (c) => GRAVE[c])
    .replace(/sh([aou])/g, "sci$1")
    .replace(/sh([eièì])/g, "sc$1")
    .replace(/sh/g, "sc")
    .replace(/kh([eièì])/g, "ch$1")
    .replace(/kh/g, "c")
    .replace(/th/g, "t")
    .replace(/y/g, "i")
    .replace(/'/g, STACCO);
}

/** Una parola: le sillabe col trattino, quella accentata in maiuscolo. */
export function comeSiLeggeParola(parola) {
  const pulita = String(parola ?? "").toLowerCase().replace(APOSTROFI, "'");
  const parti = sillabe(pulita);
  const accento = sillabaAccentata(parti);
  return parti.map((parte, i) => {
    const scritta = allItaliana(parte);
    return i === accento ? scritta.toUpperCase() : scritta;
  }).join("-");
}

/** Una riga intera: parola per parola, la punteggiatura in coda resta dov'è. */
export function comeSiLegge(frase) {
  return String(frase ?? "").split(/(\s+)/).map((pezzo) => {
    if (!pezzo.trim()) return pezzo;
    const [, corpo, coda] = pezzo.match(/^(.*?)([.,!?;:]*)$/);
    return comeSiLeggeParola(corpo) + coda;
  }).join("");
}

/**
 * La riga per la voce del computer (dal traduttore di 03_FABBRICA): le tenute
 * accentate, i suoni raschiati resi all'italiana, niente stacchi né h.
 */
export function perLaVoce(testo) {
  let s = String(testo ?? "").toLowerCase()
    .replace(/[îï]/g, "ì").replace(/â/g, "à").replace(/ê/g, "è")
    .replace(/ô/g, "ò").replace(/û/g, "ù").replace(APOSTROFI, "");
  s = s.replace(/khsh/g, "sh").replace(/khs/g, "s")
    .replace(/sh([aou])/g, "sci$1").replace(/sh([eièì])/g, "sc$1").replace(/sh/g, "sc")
    .replace(/kh([eièì])/g, "ch$1").replace(/kh/g, "c")
    .replace(/th/g, "t").replace(/y/g, "i").replace(/h/g, "")
    .replace(/\s+/g, " ").trim();
  return s;
}
