import Vector from 'victor';
import uuid from 'uuid';
import merge from 'lodash/merge';

import tilesResources from 'resources/tiles/tiles';

import * as Behaviors from './behaviors';

export default new class Tiles {

  tiles = {};

  constructor() {
    console.log(this.tiles);
  }

  /**
   * Create new block
   * @param blockId
   * @param localProperties
   * @param localProperties.location
   * @param options
   */
  create(blockId, { location }, options) {
    // unique new block id
    const id = uuid.v4();
    // prepare
    const params = merge({
      blockId,
      location: new Vector(...location),
      options,
    }, tilesResources[blockId]);
    // create instance block
    // if block has defined behaviourClass
    // it will use this class to drive the behaviour of the tile
    // and it will also be an instance instead of the object
    // therefore can have different properties then all the other blocks of the same type
    if (tilesResources[blockId].behaviourClass) {
      // create new behaviour instance of the block
      return this.tiles[id] = new Behaviors[tilesResources[blockId].behaviourClass](params);
    }

    // create static shared memory block
    // those blocks will have shared properties
    // it's preferred to use static blocks due to the performance
    this.tiles[id] = params;
  }

  /**
   * Next
   * @param sequence
   */
  next(sequence) {
    // get all tiles as array
    const tilesArr = Object.entries(this.tiles);
    // iterate through every tile
    tilesArr.map(([key, tile]) => {

      // options.static
      // if static option is true, skip all updates
      if (tile.options.static) return;

      // if tile has own next() method
      // only behaviourClass tiles can have next()
      // but its not required!
      if (tile.next) {
        return tile.next(sequence);
      }

      // implement animate
      if (tile.animate) {
        if (sequence % tile.animate.speed !== 0) return;
        let sequenceId = tile.animate.sequence.indexOf([tile.sprite.location.x, tile.sprite.location.y]) + 1;
        if (sequenceId >= tile.animate.sequence.length) {
          sequenceId = 0;
        }
        tile.sprite.location = tile.animate.sequence[sequenceId];
      }

    });
  }

  getAll() {
    return Object.entries(this.tiles).map(([key, o]) => o);
  }

};
