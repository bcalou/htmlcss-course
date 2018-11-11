import Video from '../../models/video.interface';
import Component from '../component';
import VideoComponent from './video.component';

export default class videosComponent extends Component {
  protected tagType = 'section';
  protected class = 'videos';
  protected videos: Video[];

  /** Generate the videos list */
  protected generate(): void {
    super.generate();

    this.generateVideos();
  }

  /** Render videos section */
  protected getTemplate(): string {
    return `
      <h4 class="videos__title">Vidéos utiles</h4>
      <ul class="videos__items"></ul>
    `;
  }

  /** Render a video component for each video */
  private generateVideos(): void {
    const container: HTMLUListElement = this.el.getElementsByTagName('ul')[0];

    this.videos.forEach(video => {
      new VideoComponent(
        container,
        { youtubeId: video.youtubeId },
        { injectionMethod: 'append' }
      );
    });
  }
}
