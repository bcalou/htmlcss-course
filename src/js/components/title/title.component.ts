import Component from '../../component';
import { Concept } from '../concept/concept.interface';

export default class TitleComponent extends Component {
  protected tagType = 'h3';
  protected class = 'title';
  protected concept: Concept;
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
    return this.getLetter() + '. ' + this.concept.title;
  }

  /** Get the letter for this concept */
  private getLetter(): string {
    return 'abcdefghijklmnopqrstuvwxyz'[this.index];
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
