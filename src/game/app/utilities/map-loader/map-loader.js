import flatten from 'lodash/flatten';
import axios from 'axios';

import { canvasCfg } from 'config';

import * as objects from 'objects';

// maps
// import mapDefault from 'resources/maps/default';

export default class MapLoader {

  constructor(mapId = 'default') {
    this.mapId = mapId;
  }

  /**
   * Load map
   */
  async load() {
    let map = null;

    if (window.gameMap) {
      // from memory
      map = this._loadFromMemory();
      // clear gameMap memory
      window.gameMap = null;
    } else {
      // from file
      map = await this._loadFromFile();
    }

    // initialize map
    this._initializeMap(map);
  }

  /**
   * Load map from the memory
   * - eg set by map editor
   * @private
   */
  _loadFromMemory() {
    return window.gameMap;
  }

  /**
   * Load map from file
   *  - todo: change json file
   *  - todo: use map id to load
   * @returns {*[]}
   * @private
   */
  async _loadFromFile() {
    const { data } = await axios.get(`${AJAX_ROOT}maps/${this.mapId}.json`);
    return data;
  }

  /**
   * Initialize map
   * @param map
   * @private
   */
  _initializeMap(map) {
    // mapDefault
    map.map(({ type, id, location }) => {
      objects[type].create(id, { location }, {
        static: false,
        theme: 'default',
      });
    });
  }

}
