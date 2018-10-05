import Concept from '../../models/concept.interface';
import { getSvg } from '../../utils/misc';
import Component from '../component';

export default class QuestionComponent extends Component {
  protected tagType = 'div';
  protected class = 'question';
  protected concept: Concept;

  private inputsHostClass = 'question__inputs';
  private inputEls: HTMLInputElement[];

  /** Generate question */
  protected generate(): void {
    super.generate();

    this.setInputs();
    this.retrieveAnswer();
    this.validateAnswer();
  }

  /** Get question template */
  protected getTemplate(): string {
    return `
      ${getSvg('search', 'question__icon')}
      <div class="question__inner">
        <p class="question__text">${this.concept.question.text}</p>
        <div class="question__answer">
          <div class=question__answerTitle>Votre réponse</div>
          <div class="${this.inputsHostClass}"></div>
            <p class="question__instructions">
              Répondez aux questions de la page pour constituer le mot final.
            </p>
          </div>
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
    return Array.from(this.concept.question.answer).map((letter, i) => {
      const inputEl: HTMLInputElement = document.createElement('input');
      inputEl.classList.add('question__input');
      if (
        i === this.concept.question.answer.indexOf(this.concept.question.clue)
      ) {
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

      setTimeout(() => {
        this.validateAnswer();
        this.saveAnswer();
      });
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
    const answer: string = this.store.data.concepts[this.concept.title]
      ? this.store.data.concepts[this.concept.title].answer
      : null;

    if (answer) {
      Array.from(answer).forEach((letter, i) => {
        this.inputEls[i]['value'] = letter;
      });
    }
  }

  /** Add or remove class depending of whether the answer if correct */
  private validateAnswer(): void {
    this.el.classList[
      this.getAnswer().toLowerCase() ===
      this.concept.question.answer.toLowerCase()
        ? 'add'
        : 'remove'
    ]('question--success');
  }

  /** Save answer in the local storage */
  private saveAnswer(): void {
    this.store.action({
      type: this.store.actions.setQuestionAnswer,
      payload: {
        concept: this.concept,
        answer: this.getAnswer(),
      },
    });
  }

  /** Get the answer as an actual string */
  private getAnswer(): string {
    return this.inputEls.map(input => input.value).join('');
  }
}
