import Chapter from './chapter.interface';
import TwitterAccount from './twitter-account.interface';
import Video from './video.interface';

export default interface Course {
  title: string;
  chapters: Chapter[];
  videos: Video[];
  twitterAccounts: TwitterAccount[];
}
