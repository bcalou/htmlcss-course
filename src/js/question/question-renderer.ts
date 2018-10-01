import { ElementRenderer } from '../element-renderer.interface';
import { Question } from './question.interface';

export default class QuestionRenderer implements ElementRenderer {
  public el: HTMLElement;

  private inputEls: HTMLInputElement[];

  constructor(private question: Question) {
    this.inputEls = this.getInputElements();
    this.retrieveAnswer();
    this.generate();
  }

  /** Generate the question and bind actions */
  private generate(): void {
    this.el = document.createElement('div');
    this.el.classList.add('question');
    this.el.innerHTML = `
      <svg class="question__icon icon" aria-hidden="true">
        <use xlink:href="#icon-search"></use>
      </svg>
      <div class="question__inner">
        <p class="question__text">${this.question.text}</p>
        <div class="question__answer">
          <div class=question__answerTitle>Votre réponse</div>
        <div class="question__inputs">
        </div>
          <p class="question__instructions">Répondez aux questions de la page pour constituer le mot final.</p>
        </div>
      </div>
    `;

    this.inputEls.forEach(input => {
      this.el.querySelector('.question__inputs').appendChild(input);
    });
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
      Array.from(answer).forEach((letter, i) => {
        this.inputEls[i]['value'] = letter;
      });
    }
  }

  /** Save answer in the local storage */
  private saveAnswer(): void {
    const answer: string = this.inputEls.map(input => input.value).join('');

    localStorage.setItem('question-' + this.question.answer, answer);
  }
}
