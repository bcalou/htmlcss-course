import Component from '../../component';
import Chapter from '../../pages/chapter.interface';
import { ConceptData } from '../../store-data.interface';
import { getConceptTitle } from '../../utils/misc';
import { Concept } from '../concept/concept.interface';

export default class PuzzleComponent extends Component {
  protected tagType = 'section';
  protected class = 'puzzle';
  protected chapter: Chapter;

  private letterElClass = 'puzzle__letter';

  /** Generate the puzzle component */
  protected generate(): void {
    super.generate();

    this.fill();

    this.store.registerActionCallback(
      this.store.actions.setQuestionAnswer,
      this.fill.bind(this)
    );
  }

  /** Get puzzle template */
  protected getTemplate(): string {
    return `
      <div class="puzzle__title">Le mot de la fin</div>
      <div class="puzzle__word">
        ${this.getLetterElements()}
      </div>
      <div class="puzzle__instructions">
        Répondez aux diverses questions de la page pour constituer le mot de la fin.
        Survolez une lettre pour savoir quelle est la question correspondante.
      </div>
      <div class="puzzle__text">${this.chapter.puzzle.text}</div>
    `;
  }

  /** Get a span for each letter constituting the answer */
  private getLetterElements(): string {
    return this.chapter.puzzle.word
      .split('')
      .map(
        (letter, i) =>
          `<span class="${
            this.letterElClass
          }" title="${this.getConceptTitleForLetter(letter, i)}"></span> `
      )
      .join('');
  }

  /** Get the concept title for the given letter */
  private getConceptTitleForLetter(letter: string, index: number): string {
    return getConceptTitle(
      this.getConceptForLetter(letter, index),
      this.chapter
    );
  }

  /** Get concept for the given letter */
  private getConceptForLetter(letter: string, index: number): Concept {
    let occurencesOfTheSameLetterBeforeIt = 0;

    for (let i = 0; i < index; i++) {
      if (this.chapter.puzzle[i] === letter) {
        occurencesOfTheSameLetterBeforeIt++;
      }
    }

    return this.chapter.concepts.filter(
      concept => concept.question && concept.question.clue === letter
    )[occurencesOfTheSameLetterBeforeIt];
  }

  /** Retrieve answers and fill the puzzle */
  private fill(): void {
    const puzzleAnswer: string = this.getPuzzleAnswer();
    console.log(puzzleAnswer);

    this.el
      .querySelectorAll('.' + this.letterElClass)
      .forEach((letterEl, index) => {
        letterEl.innerHTML = puzzleAnswer[index];
      });

    this.el.classList[
      puzzleAnswer === this.chapter.puzzle.word ? 'add' : 'remove'
    ]('puzzle--success');
  }

  /** Get the puzzle answer given by the user */
  private getPuzzleAnswer(): string {
    let puzzleAnswer = '';

    this.chapter.puzzle.word.split('').forEach((letter, index) => {
      const concept: Concept = this.getConceptForLetter(letter, index);
      const conceptData: ConceptData = this.store.data.concepts[concept.title];
      let letterFromAnswer = ' ';

      if (conceptData && conceptData.answer) {
        const clueIndex: number = concept.question.answer.indexOf(
          concept.question.clue
        );
        if (conceptData.answer[clueIndex]) {
          letterFromAnswer = conceptData.answer[clueIndex];
        }
      }

      puzzleAnswer += letterFromAnswer;
    });

    return puzzleAnswer;
  }
}
