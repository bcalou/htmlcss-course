import Component from '../component';

export default class FooterComponent extends Component {
  protected tagType = 'footer';
  protected class = 'footer';

  /** Get footer template */
  protected getTemplate(): string {
    return `
      <p>
        2018 -
        <a href="https://twitter.com/DctStrangelove" title="Compte Twitter" target="_blank">
          Bastien Calou
          <svg class="icon footer__twitterIcon" aria-hidden="true">
            <use xlink:href="#icon-twitter"></use>
          </svg>
        </a>
      </p>
      <a href="https://github.com/bcalou/htmlcss-course" title="Dépot Github du site" target="_blank">
        <svg class="icon footer__githubIcon" aria-hidden="true">
          <use xlink:href="#icon-github"></use>
        </svg>
      </a>
    `;
  }
}
