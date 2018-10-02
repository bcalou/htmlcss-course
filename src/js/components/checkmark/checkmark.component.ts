import Component from '../../component';
import { Concept } from '../concept/concept.interface';

export default class CheckmarkComponent extends Component {
  protected tagType = 'label';
  protected class = 'checkmark';
  protected concept: Concept;

  private localStorageId: string;

  /** Generate the checkmark */
  protected generate(): void {
    this.localStorageId = 'progression-' + this.concept.title;

    super.generate();

    this.el.setAttribute('aria-hidden', 'true');

    this.watchProgression();
  }

  /** Get the checkmark template */
  protected getTemplate(): string {
    return `
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
