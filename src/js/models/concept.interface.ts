import Figure from './figure.interface';
import Link from './link.interface';
import Question from './question.interface';

export default interface Concept {
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
