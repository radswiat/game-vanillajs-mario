// import { socket } from 'engine/sync';
import heartbeat from 'engine/heartbeat';
import renderer from 'engine/renderer';
import 'engine/controls';

import tiles from 'objects/tiles';
import entities from 'objects/entities';
import backgrounds from 'objects/backgrounds';

import MapLoader from 'utilities/map-loader';

/**
 * Game application
 */
export default class App {

  constructor() {
    // create background
    // we only want to create background once
    // so it has to be in constructor
    // as init can be re-initialized with new data
    // eg when loading new map
    backgrounds.create('GREEN');
    this._startGame();
  }

  /**
   * Initialize new game
   */
  async init({ mapId } = {}) {

    // start heartbeat loop
    // we can't auto start it as we have react wrapper
    // over the game, so we don't know when its gonna be triggered
    heartbeat.start();

    // turn on canvas visibility
    // it can be hidden due to conflicts with react z-index issue
    $('.canvas-game').css('visibility', 'visible');

    // load map
    const mapLoader = new MapLoader(mapId);
    await mapLoader.load();
  }

  reset() {
    tiles.tiles = {};
    entities.entities = {};
  }

  _startGame() {
    heartbeat.onHeartbeat((sequence) => {
      renderer.render(sequence);
    });
  }
};
