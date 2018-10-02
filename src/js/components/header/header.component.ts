import Component from '../../component';
import Chapter from '../../pages/chapter.interface';

export default class HeaderComponent extends Component {
  protected tagType = 'header';
  protected class = 'header';
  protected chapter: Chapter;

  /** Get the header template */
  protected getTemplate(): string {
    return `
      <h1 class="header__title">HTML/CSS</h1>
      <span class="header__chapterNumber">
        ${this.chapter.number < 10 ? '0' : ''}${this.chapter.number}
      </span>
      <h2 class="header__subtitle">${this.chapter.title}</h2>
    `;
  }
}
