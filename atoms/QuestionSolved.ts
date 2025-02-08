import { atom } from 'jotai';

interface QuestionSelection {
  question: string;
  selectedOptionId: string | null;
}

// Atom to store an array of selected options for questions
export const selectedOptionsAtom = atom<QuestionSelection[]>([]);
