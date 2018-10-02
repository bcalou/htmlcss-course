import { Concept } from '../components/concept/concept.interface';

export default interface Chapter {
  number: number;
  title: string;
  concepts: Concept[];
}
