import Chapter from '../../models/chapter.interface';
import Concept from '../../models/concept.interface';
import CheckmarkComponent from '../checkmark/checkmark.component';
import Children from '../children.interface';
import Component from '../component';
import TitleComponent from '../title/title.component';
import ConceptContentComponent from './concept-content/concept-content.component';

export default class ConceptComponent extends Component {
  protected tagType = 'article';
  protected class = 'concept';
  protected chapter: Chapter;
  protected concept: Concept;
  protected index: number;

  private openClass = 'concept--open';
  private hasBeenOpened = false;

  /** Register special events */
  protected generate(): void {
    super.generate();

    this.store.registerActionCallback(this.store.actions.openConcept, payload =>
      this.onConceptOpenOrClosed(payload.concept)
    );

    this.store.registerActionCallback(
      this.store.actions.closeConcept,
      payload => this.onConceptOpenOrClosed(payload.concept)
    );

    this.store.registerActionCallback(this.store.actions.openConcept, payload =>
      this.onConceptOpen(payload.concept)
    );

    this.updateState();
  }

  /** Get concept wrapper template */
  protected getTemplate(): string {
    return `
      <header class="concept__header">
        <title></title>
        <checkmark></checkmark>
      </header>
    `;
  }

  /** Get children for concept */
  protected getChildren(): Children {
    return {
      title: {
        class: TitleComponent,
        inputs: {
          chapter: this.chapter,
          concept: this.concept,
          conceptEl: this.el,
        },
      },
      checkmark: {
        class: CheckmarkComponent,
        inputs: { concept: this.concept },
      },
    };
  }

  /** Open or close the concept if it is the one modified */
  private onConceptOpenOrClosed(concept: Concept): void {
    if (concept === this.concept) {
      this.updateState();
    }
  }

  /** Close the concept if another concept is closed */
  private onConceptOpen(concept: Concept): void {
    if (concept !== this.concept && this.isOpen()) {
      this.store.action({
        type: this.store.actions.closeConcept,
        payload: { concept: this.concept },
      });
    }
  }

  /** Ask the store if the concept is open and set/remove the class */
  private updateState(): void {
    this.el.classList[this.isOpen() ? 'add' : 'remove'](this.openClass);

    if (this.isOpen()) {
      this.onOpen();
    }
  }

  /** Ask the store if the concept is open */
  private isOpen(): boolean {
    return (
      this.store.data.concepts[this.concept.title] &&
      this.store.data.concepts[this.concept.title].open
    );
  }

  /** Generate the inside of the concept only once it is open */
  private onOpen(): void {
    if (!this.hasBeenOpened) {
      this.hasBeenOpened = true;

      new ConceptContentComponent(
        this.el,
        {
          concept: this.concept,
          index: this.index,
        },
        { injectionMethod: 'append' }
      );
    }
  }
}
