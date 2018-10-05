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

  private hasBeenOpened = false;

  /** Get concept wrapper template */
  getTemplate(): string {
    return `
      <header class="concept__header">
        <title></title>
        <checkmark></checkmark>
      </header>
    `;
  }

  /** Get children for concept */
  getChildren(): Children {
    return {
      title: {
        class: TitleComponent,
        inputs: {
          chapter: this.chapter,
          concept: this.concept,
          conceptEl: this.el,
          index: this.index,
          onOpen: this.onOpen.bind(this),
        },
      },
      checkmark: {
        class: CheckmarkComponent,
        inputs: { concept: this.concept },
      },
    };
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
