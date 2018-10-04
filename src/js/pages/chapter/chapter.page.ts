import Children from '../../components/children.interface';
import ConceptsComponent from '../../components/concepts/concepts.component';
import HeaderComponent from '../../components/header/header.component';
import PuzzleComponent from '../../components/puzzle/puzzle.component';
import Chapter from '../../models/chapter.interface';
import Page from '../page';

export default class ChapterPage extends Page {
  protected chapter: Chapter;
  protected index: number;

  /** Get children components */
  protected getChildren(): Children {
    return {
      header: {
        class: HeaderComponent,
        inputs: { chapter: this.chapter, index: this.index },
      },
      concepts: {
        class: ConceptsComponent,
        inputs: { chapter: this.chapter },
      },
      puzzle: {
        class: PuzzleComponent,
        inputs: { chapter: this.chapter },
      },
    };
  }

  /** Get chapter page template */
  protected getTemplate(): string {
    return `
      <header></header>
      <concepts></concepts>
      <puzzle></puzzle>
    `;
  }
}
