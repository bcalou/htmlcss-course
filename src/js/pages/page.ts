import Children from '../components/children.interface';
import Component from '../components/component';
import FooterComponent from '../components/footer/footer.component';
import HeaderComponent from '../components/header/header.component';

export default class Page extends Component {
  protected tagType = 'div';
  protected class = 'page';

  constructor(protected inputs: any = {}) {
    super(document.querySelector('app'), inputs);
  }

  /** Get generic template for pages */
  protected getTemplate(): string {
    return `
      <header></header>
      <main class="main">
        ${this.getPageTemplate()}
      </main>
      <footer></footer>
    `;
  }

  /** Get generic children elements */
  protected getChildren(): Children {
    return Object.assign(
      {
        header: {
          class: HeaderComponent,
        },
        footer: {
          class: FooterComponent,
        },
      },
      this.getPageChildren()
    );
  }

  /** Get specific template for this page - Extend */
  protected getPageTemplate(): string {
    return '';
  }

  /** Get specific children for this page - Extend  */
  protected getPageChildren(): Children {
    return {};
  }
}
