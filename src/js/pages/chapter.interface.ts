import { Concept } from '../components/concept/concept.interface';

export default interface Chapter {
  number: number;
  title: string;
  puzzle: Puzzle;
  concepts: Concept[];
}

interface Puzzle {
  word: string;
  text: string;
}
