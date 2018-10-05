import { getSvg } from '../../utils/misc';
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
          Bastien Calou ${getSvg('twitter', 'footer__twitterIcon')}
        </a>
      </p>
      <a href="https://github.com/bcalou/htmlcss-course" title="Dépot Github du site" target="_blank">
        ${getSvg('github', 'footer__githubIcon')}
      </a>
    `;
  }
}
