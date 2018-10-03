import Chapter from '../../models/chapter.interface';
import Concept from '../../models/concept.interface';
import { getConceptTitle } from '../../utils/misc';
import Component from '../component';

export default class TitleComponent extends Component {
  protected tagType = 'h3';
  protected class = 'title';
  protected concept: Concept;
  protected chapter: Chapter;
  protected conceptEl: HTMLElement;
  protected index: number;

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

    this.setState();
  }

  /** Get title template */
  protected getTemplate(): string {
    return getConceptTitle(this.concept, this.chapter);
  }

  /** Change the state of the concept and save it to local storage */
  private toggleSection(): void {
    this.store.action({
      type: this.store.actions.toggleConcept,
      payload: {
        concept: this.concept,
      },
    });
    this.setState();
  }

  /** Add or remove open class depeding on the state */
  private setState(): void {
    this.conceptEl.classList[
      this.store.data.concepts[this.concept.title] &&
      this.store.data.concepts[this.concept.title].open
        ? 'add'
        : 'remove'
    ]('concept--open');
  }
}
