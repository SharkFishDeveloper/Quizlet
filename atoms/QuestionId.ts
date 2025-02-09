import { atom } from 'jotai';

// Atom to store an array of selected options for questions
export const questionIdAtom = atom<number|0>(0);
