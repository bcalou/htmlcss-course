import { Concept } from '../components/concept/concept.interface';
import Chapter from '../pages/chapter.interface';

/** Get the letter matching the index in the alphabet */
export function getConceptTitle(concept: Concept, chapter: Chapter): string {
  return (
    'abcdefghijklmnopqrstuvwxyz'[chapter.concepts.indexOf(concept)] +
    '. ' +
    concept.title
  );
}
