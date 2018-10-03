import Chapter from '../models/chapter.interface';
import Concept from '../models/concept.interface';

/** Get the letter matching the index in the alphabet */
export function getConceptTitle(concept: Concept, chapter: Chapter): string {
  return (
    'abcdefghijklmnopqrstuvwxyz'[chapter.concepts.indexOf(concept)] +
    '. ' +
    concept.title
  );
}
