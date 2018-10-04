import Concept from './concept.interface';
import Puzzle from './puzzle.interface';

export default interface Chapter {
  number: number;
  title: string;
  description: string;
  puzzle: Puzzle;
  concepts: Concept[];
}
