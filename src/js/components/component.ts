import Store from '../store/store';
import Children from './children.interface';
import ComponentOptions from './component-options.interface';

export default class Component {
  protected tagType: string;
  protected class: string;
  protected el: HTMLElement;
  protected store: Store;

  constructor(
    protected host: HTMLElement,
    protected inputs: any = {},
    private options: ComponentOptions = { injectionMethod: 'replace' }
  ) {
    this.store = new Store();

    /** Wait for child properties */
    setTimeout(() => {
      /** Set inputs as class properties */
      for (let input in inputs) {
        this[input] = inputs[input];
      }

      this.generate();

      if (this.host) {
        this.inject();
      }
    });
  }

  /** Generate and fill the element */
  protected generate(): void {
    this.el = document.createElement(this.tagType);
    this.el.classList.add(this.class);
    this.el.innerHTML = this.getTemplate();

    this.generateChildren();
  }

  /** Get the children */
  protected getChildren(): Children {
    return {};
  }

  /** Get the element template (override) */
  protected getTemplate(): string {
    return '';
  }

  /** Inject the element in the dom */
  protected inject(): void {
    switch (this.options.injectionMethod) {
      case 'append':
        this.host.appendChild(this.el);
        break;
      case 'replace':
        this.host.insertAdjacentElement('afterend', this.el);
        this.host.remove();
        break;
      default:
        break;
    }
  }

  /** Generate each child */
  private generateChildren(): void {
    const children: Children = this.getChildren();

    for (let child in children) {
      const hostEl: HTMLElement = this.el.querySelector(child);

      if (hostEl) {
        new children[child].class(hostEl, children[child].inputs);
      }
    }
  }
}
