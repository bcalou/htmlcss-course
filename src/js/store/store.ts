import StoreData from './store-data.interface';

let storeSingleton: Store = null;

export default class Store {
  public data: StoreData;
  public actions = {
    setConceptProgression: 'SET_CONCEPT_PROGRESSION',
    setQuestionAnswer: 'SET_QUESTION_ANSWER',
    openConcept: 'OPEN_CONCEPT',
    closeConcept: 'CLOSE_CONCEPT',
  };

  private callbacks: any = {};

  constructor() {
    if (!storeSingleton) {
      storeSingleton = this;
      this.data = this.getInitialData();
    }

    return storeSingleton;
  }

  /** Handle actions */
  public action(action: { type: string; payload?: any }) {
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
      case this.actions.openConcept:
        this.data.concepts[action.payload.concept.title].open = true;
        break;
      case this.actions.closeConcept:
        this.data.concepts[action.payload.concept.title].open = false;
        break;
      default:
        break;
    }

    this.executeCallbacks(action.type, action.payload);

    localStorage.setItem('store', JSON.stringify(this.data));
  }

  /** Get the initial data object */
  private getInitialData(): any {
    let data: any = JSON.parse(localStorage.getItem('store'));

    if (!data) {
      data = {};
    }

    if (!data.concepts) {
      data.concepts = {};
    }

    return data;
  }

  /** Register a callback for an action */
  public registerActionCallback(actionType: string, callback: Function): void {
    if (!this.callbacks[actionType]) {
      this.callbacks[actionType] = [];
    }

    this.callbacks[actionType].push(callback);
  }

  /** Execute registered callback for the given action type */
  private executeCallbacks(actionType: string, actionPayload: any): void {
    if (this.callbacks[actionType]) {
      this.callbacks[actionType].forEach(callback => {
        callback(actionPayload);
      });
    }
  }
}
