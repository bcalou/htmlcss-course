import Children from '../children.interface';
import Component from '../component';
import VideoComponent from '../videos/video.component';

export default class CorrectionComponent extends Component {
  protected tagType = 'section';
  protected class = 'correction';
  protected id = 'correction';
  protected youtubeId: string;

  /** Get correction template */
  protected getTemplate(): string {
    return `
      <div class="correction__title">Correction</div>
      <video></video>
    `;
  }

  /** Get video element */
  protected getChildren(): Children {
    return {
      video: {
        class: VideoComponent,
        inputs: {
          youtubeId: this.youtubeId,
        },
      },
    };
  }
}
