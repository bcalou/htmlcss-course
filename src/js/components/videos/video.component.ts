import Component from '../component';

export default class VideoComponent extends Component {
  protected tagType = 'div';
  protected class = 'video';

  protected youtubeId: string;
  protected title: string;

  private observer: IntersectionObserver;

  /** Wait for the element to be in the viewport to load the iframe */
  protected generate(): void {
    super.generate();

    if ('IntersectionObserver' in window) {
      setTimeout(() => {
        this.observer = new IntersectionObserver(changes => {
          if (changes[0].isIntersecting) {
            this.setIframeSrc();
            this.observer.disconnect();
          }
        });
        this.observer.observe(this.el);
      }, 100); // Little delay to avoid early triggering
    } else {
      this.setIframeSrc(); // Do it directly if intersection is not supported
    }
  }

  /** Get Video template */
  protected getTemplate(): string {
    return `
      <iframe data-src="https://www.youtube.com/embed/${
        this.youtubeId
      }" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>
    `;
  }

  /** Set the iframe src */
  private setIframeSrc(): void {
    const iframe: HTMLIFrameElement = this.el.querySelector('iframe');
    iframe.setAttribute('src', iframe.dataset.src);
  }
}
