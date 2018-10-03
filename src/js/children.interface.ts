import Component from './component';

export default interface Children {
  [key: string]: Child;
}

export interface Child {
  class: any;
  inputs?: any;
}
