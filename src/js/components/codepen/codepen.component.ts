import Concept from '../../models/concept.interface';
import Component from '../component';

export default class CodepenComponent extends Component {
  protected tagType = 'div';
  protected class = 'codepen';
  protected index: number;
  protected concept: Concept;

  /** Generate the codepen */
  protected generate(): void {
    super.generate();

    if (this.index === 0) {
      // Add help on first codepen
      const helpEl: HTMLDivElement = document.createElement('div');
      helpEl.classList.add(this.class + '__editHelp');
      helpEl.setAttribute('aria-hidden', 'true');
      helpEl.innerText = 'Cliquez ici pour éditer';
      this.el.appendChild(helpEl);
    }

    this.loadCodepenScript();
  }

  /** Get the template */
  protected getTemplate(): string {
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

  /** Load codepen script if not already done by another component */
  private loadCodepenScript(): void {
    const scriptId = 'codepen-script';
    if (!document.getElementById(scriptId)) {
      const script: HTMLScriptElement = document.createElement('script');
      script.id = 'codepen-script';
      script.src = 'https://static.codepen.io/assets/embed/ei.js';
      document.head.appendChild(script);
    }
  }
}
