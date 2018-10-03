export default interface StoreData {
  concepts: {
    [key: string]: ConceptData;
  };
}

export interface ConceptData {
  answer?: string;
  done?: boolean;
  open?: boolean;
}
