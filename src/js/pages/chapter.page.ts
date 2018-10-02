import Children from '../children.interface';
import ConceptsComponent from '../components/concepts/concepts.component';
import HeaderComponent from '../components/header/header.component';
import Page from '../page';
import Chapter from '../pages/chapter.interface';

export class ChapterPage extends Page {
  protected chapter: Chapter;

  /** Get children components */
  protected getChildren(): Children {
    return {
      header: {
        class: HeaderComponent,
        inputs: { chapter: this.chapter },
      },
      concepts: {
        class: ConceptsComponent,
        inputs: { chapter: this.chapter },
      },
    };
  }

  /** Get chapter page template */
  protected getTemplate(): string {
    return `
      <header></header>
      <concepts></concepts>
    `;
  }
}
