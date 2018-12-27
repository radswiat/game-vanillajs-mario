import { canvasCfg } from 'config';
import minBy from 'lodash/minBy';

export default new class Collision {

  // side collision modifier
  // - extends the left/right collision check size
  // - prioritize the left/right collision check in depth check
  // - allows entities to slide off the wall
  // - allows entities to be pulled onto the top of the brick when jumping near the edge
  static collisionSideMod = 16;

  setTiles(tiles) {
    this.tiles = tiles;
  }

  setEntities(entities) {
    this.entities = entities;
  }

  isColliding(object) {

    // if (!object.debugCanCollide) return;

    let collisionCount = 0;

    const collidingTiles = [];

    // todo: experimental
    // reset object properties
    object.isCollidingBottom = false;

    // combine tiles and entities for the collision detection
    const collidingObjects = this.tiles.concat(this.entities);

    // get all tiles that we have collision with
    // this has to be just bounding box collision check
    // if we want to find out how many collisions we have at the same time
    for (const tile of collidingObjects) {
      // check if bounding box collision is detected
      if (this._isBoundingBoxCollision(object, tile)) {
        if (tile.id !== object.id) collisionCount++;
        collidingTiles.push(tile);
      }
    }

    // iterate thorough each tile collision
    for (const tile of collidingTiles) {

      if (tile.id === object.id) return;

      if (this._isBoundingBoxCollision(object, tile)) {

        // get collision depth
        const depthChecks = [
          ['_collideTop', Math.abs(tile.location.y - canvasCfg.blockSize - object.location.y) - Collision.collisionSideMod],
          ['_collideBottom', Math.abs(object.location.y - canvasCfg.blockSize - tile.location.y)],
          ['_collideLeft', Math.abs(object.location.x - canvasCfg.blockSize - tile.location.x) - Collision.collisionSideMod],
          ['_collideRight', Math.abs(tile.location.x - canvasCfg.blockSize - object.location.x) - Collision.collisionSideMod],
        ];

        // collided at - check which side collides the most!
        // choose collision side that has the lowest depth
        // this will be our collision side
        // - this is a improved collision check rather then checking each side one by one!
        const [collidedAt, collisionDepth] = minBy(depthChecks, (o) => o[1]);

        // execute collision by the collided side
        this[collidedAt](object, tile, collisionDepth, collisionCount);

      }

    }

    // if (collisionCount)
    // console.log(collisionCount);
  }

  /**
   * Check bounding box collision
   * - check all edges for the collision
   * - returns true or false, doesn't specify the depth or side
   * @param object
   * @param tile
   * @return {boolean}
   * @private
   */
  _isBoundingBoxCollision(object, tile) {
    return object.location.x < tile.location.x + canvasCfg.blockSize &&
      object.location.x + canvasCfg.blockSize > tile.location.x &&
      object.location.y < tile.location.y + canvasCfg.blockSize &&
      canvasCfg.blockSize + object.location.y > tile.location.y;
  }

  /**
   * Collide top
   * @param object
   * @param tile
   * @param collisionDepth
   * @param collisionCount
   * @return {*[]}
   * @private
   */
  _collideTop(object, tile, collisionDepth, collisionCount) {

    collisionDepth += Collision.collisionSideMod;

    if (collisionCount === 1) {
      object.hasReachGroundEdge();
    }
    // inform object about collision
    object.isCollidingBottom = true;
    object.hasTouchedGround();
    // push object back by collisionDepth
    // this will fix the position of the object
    // to prevent collision
    object.location.y -= collisionDepth;
  }

  /**
   * Collide bottom
   * @param object
   * @param tile
   * @param collisionDepth
   * @param collisionCount
   * @return {*[]}
   * @private
   */
  _collideBottom(object, tile, collisionDepth, collisionCount) {
    // inform object about collision
    object.hasCollidedTop();
    // push object back by collisionDepth
    // this will fix the position of the object
    // to prevent collision
    object.location.y += collisionDepth;
  }

  /**
   * Collide right
   * @param object
   * @param tile
   * @param collisionDepth
   * @param collisionCount
   * @return {*[]}
   * @private
   */
  _collideRight(object, tile, collisionDepth, collisionCount) {
    // has the edge of the ground
    // object.hasReachGroundEdge();
    // restore modifier for proper collision detection
    collisionDepth += Collision.collisionSideMod;
    // inform object about collision
    object.hasCollidedRight();
    // push object back by collisionDepth
    // this will fix the position of the object
    // to prevent collision
    object.location.x -= collisionDepth;
  }

  /**
   * Collide left
   * @param object
   * @param tile
   * @param collisionDepth
   * @param collisionCount
   * @return {*[]}
   * @private
   */
  _collideLeft(object, tile, collisionDepth, collisionCount) {
    // has the edge of the ground
    // object.hasReachGroundEdge();
    // restore modifier for proper collision detection
    collisionDepth += Collision.collisionSideMod;
    // inform object about collision
    object.hasCollidedLeft();
    // push object back by collisionDepth
    // this will fix the position of the object
    // to prevent collision
    object.location.x += collisionDepth;
  }
};

