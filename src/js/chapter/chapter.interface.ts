import { Concept } from '../concept/concept.interface';

export default interface Chapter {
  chapterNumber: number;
  title: string;
  concepts: Concept[];
}
