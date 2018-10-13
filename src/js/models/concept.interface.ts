import Codes from './codes.interface';
import Figure from './figure.interface';
import Link from './link.interface';
import Question from './question.interface';

export default interface Concept {
  title: string;
  theory: string;
  codes: Codes;
  codepen: string;
  question?: Question;
  info?: string;
  links?: Link[];
  warning?: string;
  figure?: Figure;
}
