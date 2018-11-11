import Concept from '../../../models/concept.interface';
import { getSvg } from '../../../utils/misc';
import Children from '../../children.interface';
import CodepenComponent from '../../codepen/codepen.component';
import CodesComponent from '../../codes/codes.component';
import Component from '../../component';
import QuestionComponent from '../../question/question.component';

export default class ConceptContentComponent extends Component {
  protected tagType = 'div';
  protected class = 'concept__content';
  protected concept: Concept;
  protected index: number;

  /** Get children components */
  protected getChildren(): Children {
    return {
      codes: {
        class: CodesComponent,
        inputs: { code: this.concept.codes },
      },
      codepen: {
        class: CodepenComponent,
        inputs: { concept: this.concept, index: this.index },
      },
      question: {
        class: QuestionComponent,
        inputs: { concept: this.concept },
      },
    };
  }

  /** Get the main template for the concept tag */
  protected getTemplate(): string {
    return `
      <div class="concept__presentation">
        <div class="concept__theory">
          <p class="concept__text">${this.concept.theory}</p>
          ${this.concept.codes ? '<codes></codes>' : ''}
        </div>
        <aside class="concept__aside">
          ${this.getInfoTemplate()}
          ${this.concept.links ? this.getLinksTemplate() : ''}
        </aside>
      </div>
      <codepen></codepen>
      ${this.concept.question ? '<question></question>' : ''}
      ${this.concept.figure ? this.getFigureTemplate() : ''}
    `;
  }

  /** Get the template for the warning element */
  private getInfoTemplate(): string {
    return `
      <div class="info ${this.concept.warning ? 'info--warning' : ''}">
      ${getSvg('info', 'info__icon')}
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
          ${getSvg('bookmark')} <span class="link__label">${link.label}</span>
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
      figcaptionEl.innerHTML = this.concept.figure.caption;
      figureEl.appendChild(figcaptionEl);
    }

    return figureEl.outerHTML;
  }
}
