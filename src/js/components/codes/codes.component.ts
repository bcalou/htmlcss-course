import Codes from '../../models/codes.interface';
import { formatCode } from '../../utils/code';
import { getSvg } from '../../utils/misc';
import Component from '../component';

export default class CodesComponent extends Component {
  protected tagType = 'div';
  protected class = 'codes';
  protected code: Codes;

  /** Get template for code element */
  protected getTemplate(): string {
    return `
      ${getSvg('embed2', 'codes__icon')}
      ${this.getCodesTemplates()}
    `;
  }

  /** Get a code element for each chunk of code */
  protected getCodesTemplates(): string {
    return Object.keys(this.code)
      .map(
        language => `
      <code class="codes__code" data-language="${language}">
        ${formatCode(this.code[language], language)}
      </code>
    `
      )
      .join('');
  }
}
