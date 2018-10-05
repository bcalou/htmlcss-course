import TwitterAccount from '../../models/twitter-account.interface';
import Component from '../component';

export default class TwitterComponent extends Component {
  protected tagType = 'aside';
  protected class = 'twitter';
  protected twitterAccounts: TwitterAccount[];

  private twitterUrl = 'https://twitter.com/';

  /** Render twitter accounts */
  protected getTemplate(): string {
    return `
      <h4 class="twitter__title">Quelques comptes twitter recommandés</h4>
      <ul class="twitter__accounts">${this.getAccountsTemplate()}</ul>
    `;
  }

  /** Get a twitter account element for each account */
  private getAccountsTemplate(): string {
    return this.twitterAccounts
      .map(
        account => `
      <li class="twitter__account">
        <a href="${this.twitterUrl}${account.id}" target="_blank">
          <img class="twitter__accountAvatar" src="${account.avatarUrl}" />
          <p class="twitter__accountName">${account.name}</p>
        </a>
      </li>
    `
      )
      .join('');
  }
}
