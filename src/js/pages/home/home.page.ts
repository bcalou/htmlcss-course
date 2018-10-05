import ChaptersComponent from '../../components/chapters/chapters.component';
import Children from '../../components/children.interface';
import HeaderComponent from '../../components/header/header.component';
import TwitterComponent from '../../components/twitter/twitter.component';
import Course from '../../models/course.interface';
import Page from '../../pages/page';

export default class HomePage extends Page {
  protected course: Course;

  /** Get homepage template */
  protected getTemplate(): string {
    return `
      <header></header>
      <main>
        <chapters></chapters>
        <twitter></twitter>
      </main>
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
      twitter: {
        class: TwitterComponent,
        inputs: { twitterAccounts: this.course.twitterAccounts },
      },
    };
  }
}
