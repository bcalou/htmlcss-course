import Component from './component';

export default interface Children {
  [key: string]: Child;
}

interface Child {
  class: any;
  inputs?: any;
}
