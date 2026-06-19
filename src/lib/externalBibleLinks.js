const BASE_URL = 'https://www.bible.com/pt/bible/129';

const BOOK_CODES = {
  Mateus: 'MAT',
  Marcos: 'MRK',
  Lucas: 'LUK',
  João: 'JHN',
  Atos: 'ACT',
  Romanos: 'ROM',
  '1 Coríntios': '1CO',
  '2 Coríntios': '2CO',
  Gálatas: 'GAL',
  Efésios: 'EPH',
  Filipenses: 'PHP',
  Colossenses: 'COL',
  '1 Tessalonicenses': '1TH',
  '2 Tessalonicenses': '2TH',
  '1 Timóteo': '1TI',
  '2 Timóteo': '2TI',
  Tito: 'TIT',
  Filemom: 'PHM',
  Hebreus: 'HEB',
  Tiago: 'JAS',
  '1 Pedro': '1PE',
  '2 Pedro': '2PE',
  '1 João': '1JN',
  '2 João': '2JN',
  '3 João': '3JN',
  Judas: 'JUD',
  Apocalipse: 'REV',
};

export function getExternalBibleLink(reference) {
  const match = reference.match(/^(.+?)\s+(\d+)/);
  if (!match) return 'https://www.bible.com/pt';

  const bookName = match[1];
  const chapter = match[2];
  const code = BOOK_CODES[bookName];

  if (!code) return 'https://www.bible.com/pt';
  return `${BASE_URL}/${code}.${chapter}.NVI`;
}
