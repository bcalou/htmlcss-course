import Component from '../../component';
import Chapter from '../../pages/chapter.interface';
import ConceptComponent from '../concept/concept.component';

export default class ConceptsComponent extends Component {
  protected tagType = 'div';
  protected class = 'concepts';
  protected chapter: Chapter;

  /** Generate chapter */
  protected generate() {
    super.generate();

    this.renderConcepts();
  }

  /** Render each concept */
  private renderConcepts(): void {
    this.chapter.concepts.forEach((concept, i) => {
      new ConceptComponent(
        this.el,
        {
          chapter: this.chapter,
          concept: concept,
          index: i,
        },
        {
          injectionMethod: 'append',
        }
      );
    });
  }
}
