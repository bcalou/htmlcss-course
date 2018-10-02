import Component from '../../component';
import Question from './question.interface';

export default class QuestionComponent extends Component {
  protected tagType = 'div';
  protected class = 'question';
  protected question: Question;

  private inputsHostClass = 'question__inputs';
  private inputEls: HTMLInputElement[];

  /** Generate question */
  protected generate(): void {
    super.generate();

    this.setInputs();
    this.retrieveAnswer();
  }

  /** Get question template */
  protected getTemplate(): string {
    return `
      <svg class="question__icon icon" aria-hidden="true">
        <use xlink:href="#icon-search"></use>
      </svg>
      <div class="question__inner">
        <p class="question__text">${this.question.text}</p>
        <div class="question__answer">
          <div class=question__answerTitle>Votre réponse</div>
        <div class="${this.inputsHostClass}"></div>
          <p class="question__instructions">
            Répondez aux questions de la page pour constituer le mot final.
          </p>
        </div>
      </div>
    `;
  }

  /** Get inputs and append them to the inputs host */
  private setInputs(): void {
    this.inputEls = this.getInputElements();

    const inputsHost: HTMLElement = this.el.querySelector(
      '.' + this.inputsHostClass
    );
    for (let inputEl of this.inputEls) {
      inputsHost.appendChild(inputEl);
    }
  }

  /** Get as many inputs as needed for the question */
  private getInputElements(): HTMLInputElement[] {
    return Array.from(this.question.answer).map((letter, i) => {
      const inputEl: HTMLInputElement = document.createElement('input');
      inputEl.classList.add('question__input');
      if (i === this.question.answer.indexOf(this.question.clue)) {
        inputEl.classList.add('question__input--clue');
      }
      inputEl.setAttribute('maxLength', '1');
      this.handleKeydown(inputEl);

      return inputEl;
    });
  }

  /** What to do when an input changes */
  private handleKeydown(inputEl: HTMLInputElement): void {
    inputEl.addEventListener('keydown', e => {
      this.updateFocus(inputEl, <KeyboardEvent>e);

      this.saveAnswer();
    });
  }

  /** Adapt the focus to facilitate the input */
  private updateFocus(input: Element, e: KeyboardEvent): void {
    if (
      e.target['value'].length === 1 &&
      e['key'] !== 'Backspace' &&
      input.nextElementSibling &&
      input.nextElementSibling.nodeName === 'INPUT'
    ) {
      input.nextElementSibling['focus']();
    } else if (
      e.target['value'].length === 0 &&
      e['key'] === 'Backspace' &&
      input.previousElementSibling &&
      input.previousElementSibling.nodeName === 'INPUT'
    ) {
      input.previousElementSibling['focus']();
    }
  }

  /** Retrieve the answer saved in local storage and populate the inputs */
  private retrieveAnswer(): void {
    const answer: string = localStorage.getItem(
      'question-' + this.question.answer
    );

    if (answer) {
      Array.from(
        localStorage.getItem('question-' + this.question.answer)
      ).forEach((letter, i) => {
        this.inputEls[i]['value'] = letter;
      });
    }
  }

  /** Save answer in the local storage */
  private saveAnswer(): void {
    localStorage.setItem(
      'question-' + this.question.answer,
      this.inputEls.map(input => input.value).join('')
    );
  }
}
