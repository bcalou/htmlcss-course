let storeSingleton: Store = null;

export default class Store {
  public data: any;
  public actions = {
    setConceptProgression: 'SET_CONCEPT_PROGRESSION',
    setQuestionAnswer: 'SET_QUESTION_ANSWER',
    toggleConcept: 'TOGGLE_CONCEPT',
  };

  constructor() {
    if (!storeSingleton) {
      storeSingleton = this;
      this.data = this.getInitialData();
    }

    return storeSingleton;
  }

  /** Handle actions */
  public action(action: { type: string; payload?: any }) {
    console.log(this.data.concepts, action.payload.concept.title);
    if (
      action.payload &&
      action.payload.concept &&
      !this.data.concepts[action.payload.concept.title]
    ) {
      this.data.concepts[action.payload.concept.title] = {};
    }

    switch (action.type) {
      case this.actions.setConceptProgression:
        this.data.concepts[action.payload.concept.title].done =
          action.payload.done;
        break;
      case this.actions.setQuestionAnswer:
        this.data.concepts[action.payload.concept.title].answer =
          action.payload.answer;
        break;
      case this.actions.toggleConcept:
        this.data.concepts[action.payload.concept.title].open = !!!this.data
          .concepts[action.payload.concept.title].open;
        break;
      default:
        break;
    }

    localStorage.setItem('store', JSON.stringify(this.data));
  }

  /** Get the initial data object */
  public getInitialData(): any {
    let data: any = JSON.parse(localStorage.getItem('store'));

    if (!data) {
      data = {};
    }

    if (!data.concepts) {
      data.concepts = {};
    }

    return data;
  }
}
