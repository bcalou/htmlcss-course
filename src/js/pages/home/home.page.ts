import ChaptersComponent from '../../components/chapters/chapters.component';
import Children from '../../components/children.interface';
import TwitterComponent from '../../components/twitter/twitter.component';
import Course from '../../models/course.interface';
import Page from '../../pages/page';

export default class HomePage extends Page {
  protected course: Course;

  /** Get homepage template */
  protected getPageTemplate(): string {
    return `
      <chapters></chapters>
      <twitter></twitter>
    `;
  }

  /** Get homepage children elements */
  protected getPageChildren(): Children {
    return {
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
