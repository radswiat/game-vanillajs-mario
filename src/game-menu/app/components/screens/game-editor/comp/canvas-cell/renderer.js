
export default class CanvasCell {

  static fpsInterval = 1000 / 36;

  time = 0;
  count = 0;

  constructor(canvas, tile, size) {
    this.tile = tile;
    this.size = size;
    this.ctx = this._createCtx(canvas);
    this._heartbeat();
  }

  /**
   * Create ctx
   * - ctx is a canvas 2D rendering context
   * @param ctxName
   * @return {CanvasRenderingContext2D}
   */
  _createCtx(canvas) {
    // set canvas attributes
    // canvas.setAttribute('class', `canvas-${ctxName}`);
    canvas.width = this.size;
    canvas.height = this.size;
    // return ctx
    const ctx = canvas.getContext('2d');
    // disable auto-aliasing
    ctx.webkitImageSmoothingEnabled = false;
    ctx.mozImageSmoothingEnabled = false;
    ctx.imageSmoothingEnabled = false;
    // return ctx
    return ctx;
  }

  async _loadImage(imgPath) {
    return new Promise((resolve) => {
      const img = new Image();
      img.src = imgPath; // can also be a remote URL e.g. http://
      img.onload = () => {
        resolve(img);
      };
    });
  }

  _heartbeat() {
    requestAnimationFrame(() => {
      const now = Date.now();
      const elapsed = now - this.time;

      if (elapsed > CanvasCell.fpsInterval) {
        this.time = now;
        this._render(this.count);
        this.count++;
      }

      this._heartbeat();
    });
  }

  async _render(sequence) {

    const tile = this.tile;

    const img = await this._loadImage(tile.sprite.img);

    if (tile.animate && tile.animate.sequence) {
      if (sequence % tile.animate.speed !== 0) return;
      let sequenceId = tile.animate.sequence.indexOf(tile.sprite.location) + 1;
      if (sequenceId >= tile.animate.sequence.length) {
        sequenceId = 0;
      }
      tile.sprite.location = tile.animate.sequence[sequenceId];
    }

    // prepare sprite drawing
    const spriteLocation = tile.sprite.location;
    const spriteSize = tile.sprite.size;
    const canvasLocation = [0, 0];
    const canvasSize = [this.size, this.size];

    this.ctx.drawImage(
      img,
      ...spriteLocation,
      ...spriteSize,
      ...canvasLocation,
      ...canvasSize,
    );
  }

}
