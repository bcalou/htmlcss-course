import Chapter from '../../models/chapter.interface';
import Concept from '../../models/concept.interface';
import { formatCode } from '../../utils/code';
import CheckmarkComponent from '../checkmark/checkmark.component';
import Children from '../children.interface';
import CodepenComponent from '../codepen/codepen.component';
import Component from '../component';
import QuestionComponent from '../question/question.component';
import TitleComponent from '../title/title.component';

export default class ConceptComponent extends Component {
  protected tagType = 'article';
  protected class = 'concept';
  protected concept: Concept;
  protected chapter: Chapter;
  protected index: number;

  /** Get children components */
  protected getChildren(): Children {
    return {
      checkmark: {
        class: CheckmarkComponent,
        inputs: { concept: this.concept },
      },
      codepen: {
        class: CodepenComponent,
        inputs: { concept: this.concept, index: this.index },
      },
      question: {
        class: QuestionComponent,
        inputs: { concept: this.concept },
      },
      title: {
        class: TitleComponent,
        inputs: {
          chapter: this.chapter,
          concept: this.concept,
          conceptEl: this.el,
          index: this.index,
        },
      },
    };
  }

  /** Get the main template for the concept tag */
  protected getTemplate(): string {
    return `
      <header class="concept__header">
        <title></title>
        <checkmark></checkmark>
      </header>
      <div class="concept__content">
        <div class="concept__presentation">
          <div class="concept__theory">
            <p class="concept__text">${this.concept.theory}</p>
            <code class="code">
              <svg class="code__icon icon" aria-hidden="true">
                <use xlink:href="#icon-embed2"></use>
              </svg>
              ${formatCode(this.concept.code)}
            </code>
          </div>
          <aside class="concept__aside">
            ${this.getInfoTemplate()}
            ${this.concept.links ? this.getLinksTemplate() : ''}
          </aside>
        </div>
        <codepen></codepen>
        ${this.concept.question ? '<question></question>' : ''}
        ${this.concept.figure ? this.getFigureTemplate() : ''}
      </div>
    `;
  }

  /** Get the template for the warning element */
  private getInfoTemplate(): string {
    return `
      <div class="info ${this.concept.warning ? 'info--warning' : ''}">
        <svg class="info__icon icon" aria-hidden="true">
          <use xlink:href="#icon-info"></use>
        </svg>
        <span class="info__title">${
          this.concept.warning ? 'Attention !' : 'À noter'
        }</span>
        <p>${
          this.concept.warning ? this.concept.warning : this.concept.info
        }</p>
      </div>
    `;
  }

  /** Get the template for the link element */
  private getLinksTemplate(): string {
    return this.concept.links
      .map(
        link => `
        <a class="link" href="${link.url}" target="_blank">
          <svg class="icon" aria-hidden="true">
            <use xlink:href="#icon-bookmark"></use>
          </svg>
          <span class="link__label">${link.label}</span>
        </a>
      `
      )
      .join('');
  }

  /** Get the template for the figure element */
  private getFigureTemplate(): string {
    const figureEl: HTMLElement = document.createElement('figure');
    figureEl.classList.add('figure');
    figureEl.innerHTML = `<img class="figure__image" src="${
      this.concept.figure.src
    }" alt="${this.concept.figure.alt}" />`;

    if (this.concept.figure.caption) {
      const figcaptionEl: HTMLElement = document.createElement('figcaption');
      figcaptionEl.classList.add('figure__caption');
      figcaptionEl.innerText = this.concept.figure.caption;
      figureEl.appendChild(figcaptionEl);
    }

    return figureEl.outerHTML;
  }
}
