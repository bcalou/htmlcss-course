import Children from '../../components/children.interface';
import ConceptsComponent from '../../components/concepts/concepts.component';
import CorrectionComponent from '../../components/correction/correction.component';
import HeaderComponent from '../../components/header/header.component';
import PuzzleComponent from '../../components/puzzle/puzzle.component';
import Chapter from '../../models/chapter.interface';
import Page from '../page';

export default class ChapterPage extends Page {
  protected chapter: Chapter;
  protected index: number;

  /** Get chapter page template */
  protected getPageTemplate(): string {
    return `
      <concepts></concepts>
      <puzzle></puzzle>
      ${
        this.chapter.correctionVideoYoutubeId ? '<correction></correction>' : ''
      }
    `;
  }

  /** Get children components */
  protected getPageChildren(): Children {
    return {
      header: {
        class: HeaderComponent,
        inputs: { chapter: this.chapter, index: this.index },
      },
      concepts: {
        class: ConceptsComponent,
        inputs: { chapter: this.chapter },
      },
      correction: {
        class: CorrectionComponent,
        inputs: { youtubeId: this.chapter.correctionVideoYoutubeId },
      },
      puzzle: {
        class: PuzzleComponent,
        inputs: { chapter: this.chapter },
      },
    };
  }
}
