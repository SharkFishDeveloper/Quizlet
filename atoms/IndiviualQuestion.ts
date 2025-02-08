import { atom } from 'jotai';
import { Quiz } from '../interfaces/FullTest';

// Atom to store the entire quiz state
export const quizAtom = atom<Quiz | null>(null);
