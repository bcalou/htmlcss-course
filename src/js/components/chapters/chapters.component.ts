import Chapter from '../../models/chapter.interface';
import ConceptData from '../../store/concept-data.interface';
import { correctionShouldBeShown, getSvg } from '../../utils/misc';
import Component from '../component';

export default class ChaptersComponent extends Component {
  protected tagType = 'section';
  protected class = 'chapters';
  protected chapters: Chapter[];

  /** Get a chapter element for each chapter */
  protected getTemplate(): string {
    const date = new Date();
    const currentTimestamp =
      Math.floor(Date.now() / 1000) + date.getTimezoneOffset() * 60;

    return this.chapters
      .filter((chapter) => currentTimestamp > parseInt(chapter.available_from))
      .map((chapter, i) => {
        const index: number = i + 1;
        const conceptsNumber: number = chapter.concepts.length;
        const doneConcepts: number = this.getNumberOfDoneConcepts(chapter);
        const done: boolean = doneConcepts === conceptsNumber;
        const chapterUrl: string = 'chapter/' + index;

        return `
          <article class="chapter ${done ? 'chapter--done' : ''}">
            <div class="chapter__infos">
              <h3 class="chapter__title">
                <a href="${chapterUrl}">
                  ${index < 10 ? '0' : ''}${index}. ${chapter.title}
                </a>
              </h3>
              <p class="chapter__description">${chapter.description}</p>
              <p class="chapter__progression">
                ${doneConcepts}/${conceptsNumber}
                concept${doneConcepts > 1 ? 's' : ''}
                validé${doneConcepts > 1 ? 's' : ''}
              </p>
              ${
                correctionShouldBeShown(chapter)
                  ? '<a class="chapter__correction" href=' +
                    chapterUrl +
                    '#correction>Correction disponible</a>'
                  : ''
              }
            </div>
            <ul class="chapter__links">
              <li class="chapter__link chapter__link--exercises">
                <a href="${chapterUrl}" title="Accéder aux exercices">
                  ${getSvg('terminal')}
                </a>
              </li>
              <li class="chapter__link">
                <a href="${
                  chapter.slidesUrl
                }" target="_blank" title="Voir la présentation">
                  ${getSvg('film')}
                </a>
              </li>
            </ul>
          </article>
        `;
      })
      .join('');
  }

  /** Count the number of concepts marked as done in the given chapter */
  protected getNumberOfDoneConcepts(chapter: Chapter): number {
    return chapter.concepts.filter((concept) => {
      const conceptData: ConceptData = this.store.data.concepts[concept.title];

      return conceptData && conceptData.done;
    }).length;
  }
}
