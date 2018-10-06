import Component from '../component';

export default class MapComponent extends Component {
  protected tagType = 'section';
  protected class = 'map';

  private fullMapLoaded = false;

  /** Attach event after generation */
  protected generate(): void {
    super.generate();

    this.el.addEventListener('mouseover', this.loadFullMap.bind(this));
  }

  /** Get map template */
  protected getTemplate(): string {
    return `
      <h3 class="map__title">Carte du cours</h3>
      <span class="map__instructions">(cliquez pour agrandir)</span>
      <a class="map__inner" href="img/map.png" title="Voir en pleine taille">
        <img data-src="img/map.png" src="img/map-small.png" alt="Schéma des sujets abordés pendant le cours">
      </a>
    `;
  }

  /** Set the src of the full map to trigger the image request */
  protected loadFullMap(): void {
    if (!this.fullMapLoaded) {
      const fullMapEl: HTMLImageElement = this.el.querySelector('[data-src]');
      fullMapEl.setAttribute('src', fullMapEl.getAttribute('data-src'));
      this.fullMapLoaded = true;
    }
  }
}
