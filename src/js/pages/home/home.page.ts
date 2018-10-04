import ChaptersComponent from '../../components/chapters/chapters.component';
import Children from '../../components/children.interface';
import HeaderComponent from '../../components/header/header.component';
import Course from '../../models/course.interface';
import Page from '../../pages/page';

export default class HomePage extends Page {
  protected course: Course;

  /** Get homepage template */
  protected getTemplate(): string {
    return `
      <header></header>
      <chapters></chapters>
    `;
  }

  /** Get homepage children elements */
  protected getChildren(): Children {
    return {
      header: {
        class: HeaderComponent,
      },
      chapters: {
        class: ChaptersComponent,
        inputs: { chapters: this.course.chapters },
      },
    };
  }
}
