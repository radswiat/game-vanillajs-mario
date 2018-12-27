export default new class Viewport {

  /**
   * Center of the viewport
   * @type {number}
   */
  static VIEWPORT_CENTER = 100;

  /**
   * Target of the viewport
   * - will be set once only!
   * - on the initial update
   * @type {null}
   * @private
   */
  _target = null;

  _targetMod = null;
  _viewport = 0;

  /**
   * Set viewport target
   * - search for player in entities
   * @param entities
   * @private
   */
  _setViewportTarget(entities) {
    const target = (entities.filter((entity) => entity.blockId === 'MARIO'))[0];
    if (target) this._target = target;
  }

  /**
   * Set base target modifier
   * @param locationX
   * @private
   */
  _setBaseTargetMod(locationX) {
    this._targetMod = locationX;
  }

  /**
   * Get viewport modifier
   * - value to modify the object x locations by
   * @param target
   * @return {number}
   * @private
   */
  _getViewportMod(target) {
    return Math.ceil((target.location.x - this._targetMod) - Viewport.VIEWPORT_CENTER);
  }

  /**
   * Update objects
   * @param tiles
   * @param entities
   * @param bg
   */
  update(tiles, entities, bg) {

    // set viewport target on init
    if (this._target === null) {
      this._setViewportTarget(entities);
    }

    // when no player found
    if (!this._target) return;

    // set target mod on init
    if (this._targetMod === null) {
      this._setBaseTargetMod(this._target.location.x);
    }

    // lets keep player at the center of the viewport
    const locMod = this._getViewportMod(this._target);

    // update viewport
    this._viewport += locMod;

    // viewport limit left
    // if player is on the begging of the world
    if (this._viewport < 0) {
      this._viewport -= locMod;
      return;
    }

    tiles.map((tile) => {
      tile.location.x -= locMod;
    });
    entities.map((entity) => {
      entity.location.x -= locMod;
      if (entity.blockId === 'LUIGI_SYNC') {
        // console.warn(`${entity.location.x}`);
      }
    });
    bg.map((entity) => {
      entity.location.x -= locMod;
    });
  }

};
