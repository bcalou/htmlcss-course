import Chapter from '../../models/chapter.interface';
import Concept from '../../models/concept.interface';
import { getConceptTitle } from '../../utils/misc';
import Component from '../component';

export default class TitleComponent extends Component {
  protected tagType = 'h3';
  protected class = 'title';
  protected concept: Concept;
  protected chapter: Chapter;

  /** Generate the title */
  protected generate(): void {
    super.generate();

    this.el.setAttribute(
      'title',
      'Cliquez pour ouvrir ou refermer cette partie'
    );

    this.el.addEventListener('click', () => {
      this.toggleSection();
    });
  }

  /** Get title template */
  protected getTemplate(): string {
    return getConceptTitle(this.concept, this.chapter);
  }

  /** Change the state of the concept and save it to local storage */
  private toggleSection(): void {
    this.store.action({
      type: this.isOpen()
        ? this.store.actions.closeConcept
        : this.store.actions.openConcept,
      payload: {
        concept: this.concept,
      },
    });
  }

  /** Ask the store if the concept is open */
  private isOpen(): boolean {
    return (
      this.store.data.concepts[this.concept.title] &&
      this.store.data.concepts[this.concept.title].open
    );
  }
}
