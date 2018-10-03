import Concept from './concept.interface';
import Puzzle from './puzzle.interface';

export default interface Chapter {
  number: number;
  title: string;
  puzzle: Puzzle;
  concepts: Concept[];
}
