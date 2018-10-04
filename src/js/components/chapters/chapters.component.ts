import Chapter from '../../models/chapter.interface';
import ConceptData from '../../store/concept-data.interface';
import Component from '../component';

export default class ChaptersComponent extends Component {
  protected tagType = 'main';
  protected class = 'chapters';
  protected chapters: Chapter[];

  /** Get a chapter element for each chapter */
  protected getTemplate(): string {
    return this.chapters
      .map((chapter, i) => {
        const index: number = i + 1;
        const doneConcepts: number = this.getNumberOfDoneConcepts(chapter);

        return `
          <article class="chapter">
            <h3 class="chapter__title">
              <a href="chapter/${index}">
                ${index < 10 ? '0' : ''}${index}. ${chapter.title}
              </a>
            </h3>
            <p class="chapter__description">${chapter.description}</p>
            <p class="chapter__progression">
              ${doneConcepts}/10
              concept${doneConcepts > 1 ? 's' : ''}
              validé${doneConcepts > 1 ? 's' : ''}
            </p>
          </article>
        `;
      })
      .join('');
  }

  /** Count the number of concepts marked as done in the given chapter */
  protected getNumberOfDoneConcepts(chapter: Chapter): number {
    return chapter.concepts.filter(concept => {
      const conceptData: ConceptData = this.store.data.concepts[concept.title];

      return conceptData && conceptData.done;
    }).length;
  }
}
