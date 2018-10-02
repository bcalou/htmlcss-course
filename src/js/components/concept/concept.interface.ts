import Question from '../question/question.interface';

export interface Concept {
  title: string;
  theory: string;
  code: string;
  codepen: string;
  question: Question;
  info?: string;
  links?: Link[];
  warning?: string;
  figure?: Figure;
}

export interface Link {
  label: string;
  url: string;
}

export interface Figure {
  src: string;
  alt: string;
  caption?: string;
}
