import Chapter from '../../models/chapter.interface';
import Component from '../component';
import ConceptComponent from './concept.component';

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
