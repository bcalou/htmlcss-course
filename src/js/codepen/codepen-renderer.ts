import { Concept } from '../concept/concept.interface';
import { ElementRenderer } from '../element-renderer.interface';

export default class CodepenRenderer implements ElementRenderer {
  public el: HTMLElement;

  constructor(private concept: Concept, private index: number) {
    this.generate();
  }

  /** Replace the title slot with actual title */
  private generate(): void {
    this.el = document.createElement('div');
    this.el.classList.add('codepen');
    this.el.innerHTML = this.getTemplate();

    if (this.index === 0) {
      // Add help on first codepen
      const helpEl: HTMLDivElement = document.createElement('div');
      helpEl.classList.add('codepen__editHelp');
      helpEl.setAttribute('aria-hidden', 'true');
      helpEl.innerText = 'Cliquez ici pour éditer';
      this.el.appendChild(helpEl);
    }
  }

  /** Get the template */
  private getTemplate(): string {
    return `
      <p data-height="400" data-theme-id="0" data-slug-hash="${
        this.concept.codepen
      }" data-default-tab="html,result"
        data-user="bcalou" data-pen-title="HTML/CSS - ${
          this.concept.title
        }" class="codepen">See the Pen
        <a href="https://codepen.io/bcalou/pen/${
          this.concept.codepen
        }/">HTML/CSS - ${this.concept.title}</a> by bcalou (
        <a href="https://codepen.io/bcalou">@bcalou</a>) on
        <a href="https://codepen.io">CodePen</a>.
      </p>
    `;
  }
}
