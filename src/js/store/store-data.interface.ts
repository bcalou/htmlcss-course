import ConceptData from './concept-data.interface';

export default interface StoreData {
  concepts: {
    [key: string]: ConceptData;
  };
}
