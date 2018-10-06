import ChaptersComponent from '../../components/chapters/chapters.component';
import Children from '../../components/children.interface';
import MapComponent from '../../components/map/map.component';
import TwitterComponent from '../../components/twitter/twitter.component';
import Course from '../../models/course.interface';
import Page from '../../pages/page';

export default class HomePage extends Page {
  protected course: Course;

  /** Get homepage template */
  protected getPageTemplate(): string {
    return `
      <chapters></chapters>
      <map></map>
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
      map: {
        class: MapComponent,
      },
      twitter: {
        class: TwitterComponent,
        inputs: { twitterAccounts: this.course.twitterAccounts },
      },
    };
  }
}
