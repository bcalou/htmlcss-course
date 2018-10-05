import Chapter from './chapter.interface';
import TwitterAccount from './twitter-account.interface';

export default interface Course {
  title: string;
  chapters: Chapter[];
  twitterAccounts: TwitterAccount[];
}
