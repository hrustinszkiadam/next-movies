import { NewMovie } from './definitions';

export const placeholderMovies = (now: Date): NewMovie[] => [
  {
    title: 'Eredet',
    playedUntil: new Date(now.getTime() + 1000 * 60 * 60 * 24 * 30),
  },
  {
    title: 'A sötét lovag',
    playedUntil: new Date(now.getTime() + 1000 * 60 * 60 * 24 * 45),
  },
  {
    title: 'Csillagok között',
    playedUntil: new Date(now.getTime() + 1000 * 60 * 60 * 24 * 60),
  },
  {
    title: 'Dunkirk',
    playedUntil: new Date(now.getTime() + 1000 * 60 * 60 * 24 * 75),
  },
  {
    title: 'Tenet',
    playedUntil: new Date(now.getTime() + 1000 * 60 * 60 * 24 * 90),
  },
  {
    title: 'Avatar',
    playedUntil: new Date(now.getTime() + 1000 * 60 * 60 * 24 * 100),
  },
  {
    title: 'Star Wars: I. rész – Baljós árnyak',
    playedUntil: new Date(now.getTime() + 1000 * 60 * 60 * 24 * 110),
  },
  {
    title: 'Star Wars: II. rész – A klónok támadása',
    playedUntil: new Date(now.getTime() + 1000 * 60 * 60 * 24 * 120),
  },
  {
    title: 'Star Wars: III. rész – A sith-ek bosszúja',
    playedUntil: new Date(now.getTime() + 1000 * 60 * 60 * 24 * 130),
  },
  {
    title: 'Star Wars: IV. rész – Egy új remény',
    playedUntil: new Date(now.getTime() + 1000 * 60 * 60 * 24 * 140),
  },
  {
    title: 'Star Wars: V. rész – A Birodalom visszavág',
    playedUntil: new Date(now.getTime() + 1000 * 60 * 60 * 24 * 150),
  },
  {
    title: 'Star Wars: VI. rész – A Jedi visszatér',
    playedUntil: new Date(now.getTime() + 1000 * 60 * 60 * 24 * 160),
  },
  {
    title: 'Star Wars: VII. rész – Az ébredő Erő',
    playedUntil: new Date(now.getTime() + 1000 * 60 * 60 * 24 * 170),
  },
  {
    title: 'Star Wars: VIII. rész – Az utolsó Jedik',
    playedUntil: new Date(now.getTime() + 1000 * 60 * 60 * 24 * 180),
  },
  {
    title: 'Star Wars: IX. rész – Skywalker felemelkedése',
    playedUntil: new Date(now.getTime() + 1000 * 60 * 60 * 24 * 190),
  },
];
