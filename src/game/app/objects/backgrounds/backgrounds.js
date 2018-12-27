import Vector from 'victor';

import clone from 'lodash/cloneDeep';

import { canvasCfg } from 'config';

import backgroundResources from 'resources/backgrounds/backgrounds';

// import * as Behaviors from './behaviors';

export default new class Tiles {

  objects = [];

  /**
   * Create new block
   * @param blockId
   */
  create(blockId) {

    const params = {
      scale: false,
      renderType: 'background',
      size: canvasCfg.canvasSize,
      location: new Vector(0, 0),
      sprite: {
        img: 'assets/bg.png',
        location: [0, 0],
        size: [2000, 1180],
      },
    };

    // to enable smooth background transitions,
    // we need 2 backgrounds objects
    this.objects.push(
      clone(params),
      clone(params),
    );

  }

  /**
   * Next
   * @param sequence
   */
  next(sequence) {

    // initial background set
    // when bg starts, all bgs are in the same location [0, 0]
    // chain them one after the other
    if (this.objects[0].location.x === this.objects[1].location.x) {
      this.objects.map((o, key) => {
        o.location.x += (canvasCfg.canvasSize[0] * key);
      });
    }

    // move all the backgrounds
    this.objects[0].location.x -= 1;
    this.objects[1].location.x -= 1;

    // update bg size on every loop
    // this is to make sure size will be
    // updated when canvasSize will change due to
    // screen resize
    this.objects.map((bg) => {
      bg.size = clone(canvasCfg.canvasSize);
      bg.size[0] += 64 * 10;
      bg.size[1] += 64 * 6;
    });

    // if leading ( first ) background is out of the screen
    // move it to the end of the array
    if (Math.abs(this.objects[0].location.x) > canvasCfg.canvasSize[0]) {
      const bg = this.objects.shift();
      bg.location.x = this.objects[0].location.x + canvasCfg.canvasSize[0];
      this.objects.push(bg);
    }

  }

  getAll() {
    return this.objects;
  }

};
