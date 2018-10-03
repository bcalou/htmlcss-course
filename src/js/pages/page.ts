import Component from '../components/component';

export default class Page extends Component {
  protected tagName = 'div';
  protected class = 'page';

  constructor(protected inputs: any = {}) {
    super(document.querySelector('app'), inputs);
  }
}
