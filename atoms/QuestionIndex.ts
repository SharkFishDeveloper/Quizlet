import { atom } from 'jotai';

// Atom to store an array of selected options for questions
export const questionIndexAtom = atom<number|0>(0);
