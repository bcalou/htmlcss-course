import CheckmarkRenderer from '../checkmark/checkmark-renderer';
import CodepenRenderer from '../codepen/codepen-renderer';
import { ElementRenderer } from '../element-renderer.interface';
import QuestionRenderer from '../question/question-renderer';
import TitleRenderer from '../title/title-renderer';
import { formatCode } from '../utils/code';
import { Concept, Figure, Link } from './concept.interface';

export default class ConceptRenderer implements ElementRenderer {
  public el: HTMLElement;

  constructor(private concept: Concept, private index: number) {
    this.renderConcept();
  }

  /** Render the concept and append it to the main element */
  private renderConcept(): void {
    console.log('render: ', this.concept.title);
    this.el = document.createElement('article');
    this.el.classList.add('concept');
    this.el.innerHTML = this.getTemplate(this.concept);

    this.renderChildren();
  }

  /** Render the children on the component */
  private renderChildren(): void {
    let renderers: any = {
      title: new TitleRenderer(this.concept, this.el, this.index),
      checkmark: new CheckmarkRenderer(this.concept),
      codepen: new CodepenRenderer(this.concept, this.index),
    };

    if (this.concept.question) {
      renderers.question = new QuestionRenderer(this.concept.question);
    }

    for (let renderer in renderers) {
      this.populateSlot(renderer, renderers[renderer]);
    }
  }

  private populateSlot(slotId: string, elRenderer: ElementRenderer): void {
    const slot: HTMLElement = this.el.querySelector('#' + slotId);
    slot.insertAdjacentElement('afterend', elRenderer.el);
    slot.remove();
  }

  /** Get the main template for the concept tag */
  private getTemplate(concept: Concept): string {
    return `
      <header class="concept__header">
        <slot id="title"></slot>
        <slot id="checkmark"></slot>
      </header>
      <div class="concept__content">
        <div class="concept__presentation">
          <div class="concept__theory">
            <p class="concept__text">${concept.theory}</p>
            <code class="code">
              <svg class="code__icon icon" aria-hidden="true">
                <use xlink:href="#icon-embed2"></use>
              </svg>
              ${formatCode(concept.code)}
            </code>
          </div>
          <aside class="concept__aside">
            ${this.getInfoTemplate(concept)}
            ${concept.links ? this.getLinksTemplate(concept.links) : ''}
          </aside>
        </div>
        <slot id="codepen"></slot>
        <slot id="question"></slot>
        ${concept.figure ? this.getFigureTemplate(concept.figure) : ''}
      </div>
    `;
  }

  /** Get the template for the warning element */
  private getInfoTemplate(concept: Concept): string {
    return `
      <div class="info ${concept.warning ? 'info--warning' : ''}">
        <svg class="info__icon icon" aria-hidden="true">
          <use xlink:href="#icon-info"></use>
        </svg>
        <span class="info__title">${
          concept.warning ? 'Attention !' : 'À noter'
        }</span>
        <p>${concept.warning ? concept.warning : concept.info}</p>
      </div>
    `;
  }

  /** Get the template for the link element */
  private getLinksTemplate(links: Link[]): string {
    return links
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
  private getFigureTemplate(figure: Figure): string {
    const figureEl: HTMLElement = document.createElement('figure');
    figureEl.classList.add('figure');
    figureEl.innerHTML = `<img class="figure__image" src="${figure.src}" alt="${
      figure.alt
    }" />`;

    if (figure.caption) {
      const figcaptionEl: HTMLElement = document.createElement('figcaption');
      figcaptionEl.classList.add('figure__caption');
      figcaptionEl.innerText = figure.caption;
      figureEl.appendChild(figcaptionEl);
    }

    return figureEl.outerHTML;
  }
}
