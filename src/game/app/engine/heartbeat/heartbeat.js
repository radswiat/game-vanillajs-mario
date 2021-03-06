import stats from 'engine/stats';

export default new class Heartbeat {

  isRunning = false;
  actions = [];
  temporaryActions = [];
  then = 0;
  fpsInterval = 1000 / 36;
  tickCount = 0;

  constructor() {
    this._shouldEngineTick();
  }

  start() {
    this.isRunning = true;
  }

  /**
   * Check if engine should tick/render a frame
   * - limit max frames to 30 frames per second
   * @private
   */
  _shouldEngineTick() {
    requestAnimationFrame(() => {
      if (this.isRunning) {
        let now = Date.now();
        let elapsed = now - this.then;

        if (elapsed > this.fpsInterval) {
          this.then = now;
          this._tick();
          return;
        }
      }
      this._shouldEngineTick();
    });
  }

  /**
   * Make a tick,
   * - render all registered methods
   * @private
   */
  async _tick() {
    stats.begin();
    const tickCount = this.tickCount++;
    const targetStat = document.getElementById('debug_heartbeats');
    if (targetStat) {
      targetStat.innerHTML = this.actions.length;
    }
    for (const action of this.actions) {
      await action(tickCount);
    }
    for (const [index, action] of this.temporaryActions.entries()) {
      if (action(tickCount)) {
        this.temporaryActions.splice(index, 1);
      }
    }
    stats.end();
    this._shouldEngineTick();
  }

  /**
   * Execute CB as often as possible using requestAnimationFrame
   * @param cb
   */
  onHeartbeat(cb) {
    this.actions.push(cb);
  }

  tillEnd(cb) {
    this.temporaryActions.push(cb);
  }
}
