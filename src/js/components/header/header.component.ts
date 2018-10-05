import Chapter from '../../models/chapter.interface';
import { getSvg } from '../../utils/misc';
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
      <div class="header__chapterInfos">
        <span class="header__chapterNumber">
          ${this.index < 10 ? '0' : ''}${this.index}
        </span>
        <h2 class="header__chapterTitle">${this.chapter.title}</h2>
      </div>
      <a class="header__slides" href="${
        this.chapter.slidesUrl
      }" target="_blank" title="Voir la présentation">${getSvg('film')}</a>
    `;
  }
}
