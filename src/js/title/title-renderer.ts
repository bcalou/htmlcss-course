import { Concept } from '../concept/concept.interface';
import { ElementRenderer } from '../element-renderer.interface';

export default class TitleRenderer implements ElementRenderer {
  public el: HTMLElement;

  private stateId = 'open-' + this.concept.title;

  constructor(
    private concept: Concept,
    private conceptEl: HTMLElement,
    private index: number
  ) {
    this.generate();
  }

  /** Replace the title slot with actual title */
  private generate(): void {
    this.el = document.createElement('h2');
    this.el.classList.add('concept__title');
    this.el.setAttribute(
      'title',
      'Cliquez pour ouvrir ou refermer cette partie'
    );
    this.el.innerText = this.getLetter() + '. ' + this.concept.title;
    this.el.addEventListener('click', () => {
      this.toggleSection();
    });

    this.setState();
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

  /** Get the letter for this concept */
  private getLetter(): string {
    return 'abcdefghijklmnopqrstuvwxyz'[this.index];
  }
}
