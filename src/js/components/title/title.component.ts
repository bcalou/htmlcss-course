import Component from '../../component';
import { Concept } from '../concept/concept.interface';

export default class TitleComponent extends Component {
  protected tagType = 'h3';
  protected class = 'title';
  protected concept: Concept;
  protected conceptEl: HTMLElement;
  protected index: number;

  private stateId: string;

  /** Generate the title */
  protected generate(): void {
    super.generate();

    this.stateId = 'open-' + this.concept.title;

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
    if (localStorage.getItem(this.stateId)) {
      localStorage.removeItem(this.stateId);
    } else {
      localStorage.setItem(this.stateId, 'true');
    }
    this.setState();
  }

  /** Add or remove open class depeding on the state */
  private setState(): void {
    this.conceptEl.classList[
      localStorage.getItem(this.stateId) ? 'add' : 'remove'
    ]('concept--open');
  }
}
