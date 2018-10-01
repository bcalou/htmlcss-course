import ConceptRenderer from '../concept/concept-renderer';
import Chapter from './chapter.interface';

export default class ChapterRenderer {
  private chapter: Chapter;
  private conceptsEl: HTMLElement;

  constructor(private callback: Function) {
    this.conceptsEl = document.getElementById('concepts');

    // Prevent live-reload multiple rendering
    if (this.conceptsEl.childElementCount === 0) {
      this.fetchChapter().then(chapter => {
        this.chapter = chapter;
        this.renderChapter();
        this.callback();
      });
    }
  }

  /** Fetch the JSON data for this chapter */
  private fetchChapter(): Promise<Chapter> {
    return fetch('../data/data.json').then(res => res.json());
  }

  /** Render the chapter elements */
  private renderChapter(): void {
    this.renderHeader();
    this.renderConcepts();
  }

  /** Populate the header with data */
  private renderHeader(): void {
    let chapterNumber: string = this.chapter.chapterNumber.toString();
    if (chapterNumber.length === 1) {
      chapterNumber = '0' + chapterNumber;
    }

    document.querySelector('.header__chapterNumber').innerHTML = chapterNumber;

    document.querySelector('.header__subtitle').innerHTML = this.chapter.title;
  }

  /** Render each concept */
  private renderConcepts(): void {
    this.chapter.concepts.forEach((concept, i) => {
      const conceptRenderer = new ConceptRenderer(concept, i);
      this.conceptsEl.appendChild(conceptRenderer.el);
    });
  }
}
