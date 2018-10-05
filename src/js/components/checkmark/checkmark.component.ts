import Concept from '../../models/concept.interface';
import { getSvg } from '../../utils/misc';
import Component from '../component';

export default class CheckmarkComponent extends Component {
  protected tagType = 'label';
  protected class = 'checkmark';
  protected concept: Concept;

  /** Generate the checkmark */
  protected generate(): void {
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
        ${getSvg('checkmark')}
      </div>
    `;
  }

  /** Is this concept marked as done */
  private isDone(): boolean {
    return (
      this.store.data.concepts &&
      this.store.data.concepts[this.concept.title] &&
      this.store.data.concepts[this.concept.title].done
    );
  }

  /** Watch clicks on checkmarks */
  private watchProgression(): void {
    this.el.addEventListener('change', e => {
      this.saveProgression(e.target['checked']);
    });
  }

  /** Save the  current progression into the local storage */
  private saveProgression(done: boolean): void {
    this.store.action({
      type: this.store.actions.setConceptProgression,
      payload: { concept: this.concept, done: done },
    });
  }
}
