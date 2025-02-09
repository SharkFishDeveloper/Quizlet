import { atom } from 'jotai';

// Atom to store an array of selected options for questions
export const submitTestAtom = atom<string[]|null>(null);
