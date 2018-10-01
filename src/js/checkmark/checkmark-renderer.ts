import { Concept } from '../concept/concept.interface';
import { ElementRenderer } from '../element-renderer.interface';

export default class CheckmarkRenderer implements ElementRenderer {
  public el: HTMLLabelElement;

  private localStorageId: string;
  private progression: number[];

  constructor(private concept: Concept) {
    this.localStorageId = 'progression-' + this.concept.title;

    this.generate();
    this.watchProgression();
  }

  /** Generate the checkmark template and bind actions */
  private generate(): void {
    this.el = document.createElement('label');
    this.el.classList.add('checkmark');
    this.el.setAttribute('aria-hidden', 'true');

    this.el.innerHTML = `
      <input class="checkmark__input" type="checkbox" ${
        this.isDone() ? 'checked' : ''
      }>
      <div class="checkmark__icon" title="Marquer votre progression">
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-checkmark"></use>
        </svg>
      </div>
    `;
  }

  /** Is this concept marked as done */
  private isDone(): boolean {
    return !!localStorage.getItem(this.localStorageId);
  }

  /** Watch clicks on checkmarks */
  private watchProgression(): void {
    this.el.addEventListener('change', e => {
      this.saveProgression(e.target['checked']);
    });
  }

  /** Save the  current progression into the local storage */
  private saveProgression(done: boolean): void {
    if (done) {
      localStorage.setItem(this.localStorageId, 'true');
    } else {
      localStorage.removeItem(this.localStorageId);
    }
  }
}
