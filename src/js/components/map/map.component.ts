import Component from '../component';

export default class MapComponent extends Component {
  protected tagType = 'section';
  protected class = 'map';

  /** Get map template */
  protected getTemplate(): string {
    return `
      <h3 class="map__title">Carte du cours</h3>
      <span class="map__instructions">(cliquez pour agrandir)</span>
      <a href="img/map.png" title="Voir en pleine taille">
        <img src="img/map-small.png" alt="Schéma des sujets abordés pendant le cours">
      </a>
    `;
  }
}
