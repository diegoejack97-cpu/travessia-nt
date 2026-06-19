export const STAGES = [
  {
    id: 'evangelhos',
    numeral: 'I',
    name: 'Caminho dos Evangelhos',
    shortName: 'Evangelhos',
    subtitle: 'A vida de Cristo',
    color: '#2f9e6f',
    themeClass: 'stage-evangelhos',
    mapImage: null,
    backgroundImage: null,
    books: [
      {
        id: 'mateus',
        name: 'Mateus',
        abbr: 'Mt',
        days: [
          { n: 1, ref: 'Mateus 1-4' },
          { n: 2, ref: 'Mateus 5-7' },
          { n: 3, ref: 'Mateus 8-11' },
          { n: 4, ref: 'Mateus 12-16' },
          { n: 5, ref: 'Mateus 17-22' },
          { n: 6, ref: 'Mateus 23-28' },
        ],
      },
      {
        id: 'marcos',
        name: 'Marcos',
        abbr: 'Mc',
        days: [
          { n: 7, ref: 'Marcos 1-4' },
          { n: 8, ref: 'Marcos 5-8' },
          { n: 9, ref: 'Marcos 9-12' },
          { n: 10, ref: 'Marcos 13-16' },
        ],
      },
      {
        id: 'lucas',
        name: 'Lucas',
        abbr: 'Lc',
        days: [
          { n: 11, ref: 'Lucas 1-4' },
          { n: 12, ref: 'Lucas 5-8' },
          { n: 13, ref: 'Lucas 9-13' },
          { n: 14, ref: 'Lucas 14-19' },
          { n: 15, ref: 'Lucas 20-24' },
        ],
      },
      {
        id: 'joao',
        name: 'João',
        abbr: 'Jo',
        days: [
          { n: 16, ref: 'João 1-5' },
          { n: 17, ref: 'João 6-10' },
          { n: 18, ref: 'João 11-16' },
          { n: 19, ref: 'João 17-21' },
        ],
      },
    ],
  },
  {
    id: 'atos',
    numeral: 'II',
    name: 'Estrada de Atos',
    shortName: 'Atos',
    subtitle: 'A Igreja em marcha',
    color: '#2d7dd2',
    themeClass: 'stage-atos',
    mapImage: null,
    backgroundImage: null,
    books: [
      {
        id: 'atos',
        name: 'Atos',
        abbr: 'At',
        days: [
          { n: 20, ref: 'Atos 1-7' },
          { n: 21, ref: 'Atos 8-14' },
          { n: 22, ref: 'Atos 15-21' },
          { n: 23, ref: 'Atos 22-28' },
        ],
      },
    ],
  },
  {
    id: 'cartas-paulo',
    numeral: 'III',
    name: 'Acampamento das Cartas',
    shortName: 'Cartas',
    subtitle: 'Doutrina e exortação',
    color: '#d47b2f',
    themeClass: 'stage-cartas',
    mapImage: null,
    backgroundImage: null,
    books: [
      {
        id: 'romanos',
        name: 'Romanos',
        abbr: 'Rm',
        days: [
          { n: 24, ref: 'Romanos 1-5' },
          { n: 25, ref: 'Romanos 6-11' },
          { n: 26, ref: 'Romanos 12-16' },
        ],
      },
      {
        id: '1-corintios',
        name: '1 Coríntios',
        abbr: '1Co',
        days: [
          { n: 27, ref: '1 Coríntios 1-6' },
          { n: 28, ref: '1 Coríntios 7-11' },
          { n: 29, ref: '1 Coríntios 12-16' },
        ],
      },
      {
        id: '2-corintios',
        name: '2 Coríntios',
        abbr: '2Co',
        days: [
          { n: 30, ref: '2 Coríntios 1-7' },
          { n: 31, ref: '2 Coríntios 8-13' },
        ],
      },
      { id: 'galatas', name: 'Gálatas', abbr: 'Gl', days: [{ n: 32, ref: 'Gálatas 1-6' }] },
      { id: 'efesios', name: 'Efésios', abbr: 'Ef', days: [{ n: 33, ref: 'Efésios 1-6' }] },
      { id: 'filipenses', name: 'Filipenses', abbr: 'Fp', days: [{ n: 34, ref: 'Filipenses 1-4' }] },
      { id: 'colossenses', name: 'Colossenses', abbr: 'Cl', days: [{ n: 35, ref: 'Colossenses 1-4' }] },
      { id: '1-tessalonicenses', name: '1 Tessalonicenses', abbr: '1Ts', days: [{ n: 36, ref: '1 Tessalonicenses 1-5' }] },
      { id: '2-tessalonicenses', name: '2 Tessalonicenses', abbr: '2Ts', days: [{ n: 37, ref: '2 Tessalonicenses 1-3' }] },
      { id: '1-timoteo', name: '1 Timóteo', abbr: '1Tm', days: [{ n: 38, ref: '1 Timóteo 1-6' }] },
      { id: '2-timoteo', name: '2 Timóteo', abbr: '2Tm', days: [{ n: 39, ref: '2 Timóteo 1-4' }] },
      { id: 'tito', name: 'Tito', abbr: 'Tt', days: [{ n: 40, ref: 'Tito 1-3' }] },
      { id: 'filemom', name: 'Filemom', abbr: 'Fm', days: [{ n: 41, ref: 'Filemom' }] },
    ],
  },
  {
    id: 'gerais',
    numeral: 'IV',
    name: 'Vale da Perseverança',
    shortName: 'Perseverança',
    subtitle: 'Fé perseverante',
    color: '#6c63b7',
    themeClass: 'stage-gerais',
    mapImage: null,
    backgroundImage: null,
    books: [
      { id: 'hebreus', name: 'Hebreus', abbr: 'Hb', days: [{ n: 42, ref: 'Hebreus 1-7' }, { n: 43, ref: 'Hebreus 8-13' }] },
      { id: 'tiago', name: 'Tiago', abbr: 'Tg', days: [{ n: 44, ref: 'Tiago 1-5' }] },
      { id: '1-pedro', name: '1 Pedro', abbr: '1Pe', days: [{ n: 45, ref: '1 Pedro 1-5' }] },
      { id: '2-pedro', name: '2 Pedro', abbr: '2Pe', days: [{ n: 46, ref: '2 Pedro 1-3' }] },
      { id: '1-joao', name: '1 João', abbr: '1Jo', days: [{ n: 47, ref: '1 João 1-5' }] },
      { id: '2-joao', name: '2 João', abbr: '2Jo', days: [{ n: 48, ref: '2 João' }] },
      { id: '3-joao', name: '3 João', abbr: '3Jo', days: [{ n: 49, ref: '3 João' }] },
      { id: 'judas', name: 'Judas', abbr: 'Jd', days: [{ n: 50, ref: 'Judas' }] },
    ],
  },
  {
    id: 'apocalipse',
    numeral: 'V',
    name: 'Monte da Vitória',
    shortName: 'Vitória',
    subtitle: 'A vitória final',
    color: '#b83246',
    themeClass: 'stage-apocalipse',
    mapImage: null,
    backgroundImage: null,
    books: [
      {
        id: 'apocalipse',
        name: 'Apocalipse',
        abbr: 'Ap',
        days: [
          { n: 51, ref: 'Apocalipse 1-3' },
          { n: 52, ref: 'Apocalipse 4-6' },
          { n: 53, ref: 'Apocalipse 7-9' },
          { n: 54, ref: 'Apocalipse 10-12' },
          { n: 55, ref: 'Apocalipse 13-15' },
          { n: 56, ref: 'Apocalipse 16-18' },
          { n: 57, ref: 'Apocalipse 19-20' },
          { n: 58, ref: 'Apocalipse 21-22' },
        ],
      },
    ],
  },
];

const EXTRA_REVIEW_DAYS = [
  { n: 59, ref: 'Mateus 5-7', bookId: 'mateus', phaseId: 'evangelhos', title: 'Revisão do Reino' },
  { n: 60, ref: 'João 13-17', bookId: 'joao', phaseId: 'evangelhos', title: 'Últimas palavras de Cristo' },
  { n: 61, ref: 'Atos 1-4', bookId: 'atos', phaseId: 'atos', title: 'Igreja em movimento' },
  { n: 62, ref: 'Atos 9-13', bookId: 'atos', phaseId: 'atos', title: 'Chamado e missão' },
  { n: 63, ref: 'Romanos 5-8', bookId: 'romanos', phaseId: 'cartas-paulo', title: 'Vida no Espírito' },
  { n: 64, ref: 'Romanos 12-15', bookId: 'romanos', phaseId: 'cartas-paulo', title: 'Culto vivo' },
  { n: 65, ref: '1 Coríntios 12-15', bookId: '1-corintios', phaseId: 'cartas-paulo', title: 'Corpo e ressurreição' },
  { n: 66, ref: 'Efésios 4-6', bookId: 'efesios', phaseId: 'cartas-paulo', title: 'Nova caminhada' },
  { n: 67, ref: 'Filipenses 1-4', bookId: 'filipenses', phaseId: 'cartas-paulo', title: 'Alegria perseverante' },
  { n: 68, ref: 'Colossenses 1-4', bookId: 'colossenses', phaseId: 'cartas-paulo', title: 'Cristo acima de tudo' },
  { n: 69, ref: '1 Timóteo 3-6', bookId: '1-timoteo', phaseId: 'cartas-paulo', title: 'Caráter aprovado' },
  { n: 70, ref: '2 Timóteo 1-4', bookId: '2-timoteo', phaseId: 'cartas-paulo', title: 'Combate da fé' },
  { n: 71, ref: 'Hebreus 10-12', bookId: 'hebreus', phaseId: 'gerais', title: 'Perseverar até o fim' },
  { n: 72, ref: 'Tiago 1-5', bookId: 'tiago', phaseId: 'gerais', title: 'Fé em prática' },
  { n: 73, ref: '1 Pedro 1-5', bookId: '1-pedro', phaseId: 'gerais', title: 'Esperança firme' },
  { n: 74, ref: '1 João 1-5', bookId: '1-joao', phaseId: 'gerais', title: 'Amor e verdade' },
  { n: 75, ref: 'Apocalipse 21-22', bookId: 'apocalipse', phaseId: 'apocalipse', title: 'A vitória final' },
];

export const ALL_BOOKS = STAGES.flatMap((stage) =>
  stage.books.map((book) => ({ ...book, phaseId: stage.id, phaseName: stage.name })),
);

const baseDays = STAGES.flatMap((stage) =>
  stage.books.flatMap((book) =>
    book.days.map((day) => ({
      ...day,
      title: `${book.name} em jornada`,
      bookId: book.id,
      bookName: book.name,
      phaseId: stage.id,
      phaseName: stage.name,
    })),
  ),
);

export const ALL_DAYS = [...baseDays, ...EXTRA_REVIEW_DAYS.map((day) => {
  const book = ALL_BOOKS.find((item) => item.id === day.bookId);
  const stage = STAGES.find((item) => item.id === day.phaseId);
  return {
    ...day,
    bookName: book?.name ?? day.bookId,
    phaseName: stage?.name ?? day.phaseId,
  };
})].sort((a, b) => a.n - b.n);

export const TOTAL_DAYS = ALL_DAYS.length;

export const BOOK_BY_ID = ALL_BOOKS.reduce((acc, book) => {
  acc[book.id] = book;
  return acc;
}, {});

export const STAGE_BY_ID = STAGES.reduce((acc, stage) => {
  acc[stage.id] = stage;
  return acc;
}, {});
