import Vector from 'victor';
import merge from 'lodash/merge';
import uuid from 'uuid';

import entitiesResources from 'resources/entities/entities';

import * as Behaviors from './behaviors';

export default new class Tiles {

  entities = {};

  constructor() {
    console.log(this.entities);
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
    }, entitiesResources[blockId]);
    // create instance block
    // if block has defined behaviourClass
    // it will use this class to drive the behaviour of the tile
    // and it will also be an instance instead of the object
    // therefore can have different properties then all the other blocks of the same type
    if (entitiesResources[blockId].behaviourClass) {
      // create new behaviour instance of the block
      return this.entities[id] = new Behaviors[entitiesResources[blockId].behaviourClass](params);
    }

    // create static shared memory block
    // those blocks will have shared properties
    // it's preferred to use static blocks due to the performance
    this.entities[id] = params;
  }

  /**
   * Next
   * @param sequence
   */
  next(sequence) {
    // get all tiles as array
    const entitiesArr = Object.entries(this.entities);
    // iterate through every tile
    entitiesArr.map(([key, entity]) => {

      // options.static
      // if static option is true, skip all updates
      if (entity.options.static) return;

      // if tile has own next() method
      // only behaviourClass tiles can have next()
      // but its not required!
      if (entity.next) {
        return entity.next(sequence);
      }

    });
  }

  getAll() {
    return Object.entries(this.entities).map(([key, o]) => o);
  }

};
