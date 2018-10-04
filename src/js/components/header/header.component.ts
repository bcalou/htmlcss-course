import Chapter from '../../models/chapter.interface';
import Component from '../component';

export default class HeaderComponent extends Component {
  protected tagType = 'header';
  protected class = 'header';
  protected chapter: Chapter;
  protected index: number;

  /** Get the header template */
  protected getTemplate(): string {
    return `
      <h1 class="header__title">
        <a href="/" title="Retour à l'accueil">HTML/CSS</a>
      </h1>
      ${this.chapter ? this.getHeaderChapterDetails() : ''}
    `;
  }

  /** Get current chapter details */
  private getHeaderChapterDetails(): string {
    return `
      <span class="header__chapterNumber">
        ${this.index < 10 ? '0' : ''}${this.index}
      </span>
      <h2 class="header__subtitle">${this.chapter.title}</h2>
    `;
  }
}
