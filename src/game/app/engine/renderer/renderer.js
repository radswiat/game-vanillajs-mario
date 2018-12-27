import clone from 'lodash/cloneDeep';

import { canvasCfg } from 'config';

import tiles from 'objects/tiles';
import entities from 'objects/entities';
import backgrounds from 'objects/backgrounds';

import velocity from 'modules/velocity';
import collision from 'modules/collision';
import viewport from 'modules/viewport';
import grid from 'engine/grid';

import scale from './helpers/scale';

export default new class Renderer {

  constructor() {
    this.ctx = this._createCtx('main');
  }

  /**
   * Create ctx
   * - ctx is a canvas 2D rendering context
   * @param ctxName
   * @return {CanvasRenderingContext2D}
   */
  _createCtx(ctxName) {
    // create canvas element
    const canvas = document.createElement('canvas');
    // set canvas attributes
    canvas.setAttribute('class', `canvas-${ctxName}`);
    canvas.setAttribute('class', 'canvas-game');
    // set canvas size back to config
    canvasCfg.canvasSize = [window.innerWidth, window.innerHeight];
    canvas.width = canvasCfg.canvasSize[0];
    canvas.height = canvasCfg.canvasSize[1];
    // get parent element
    const parent = document.querySelector(canvasCfg.targetNode);
    // append canvas to parent element
    parent.append(canvas);
    // return ctx
    const ctx = canvas.getContext('2d');
    // disable auto-aliasing
    ctx.webkitImageSmoothingEnabled = false;
    ctx.mozImageSmoothingEnabled = false;
    ctx.imageSmoothingEnabled = false;
    // be ready for resize
    window.addEventListener('resize', () => {
      this._ctxResize(canvas, ctx);
    }, true);
    // return ctx
    return ctx;
  }

  _ctxResize(canvas, ctx) {
    // set canvas size back to config
    canvasCfg.canvasSize = [window.innerWidth, window.innerHeight];
    canvas.width = canvasCfg.canvasSize[0];
    canvas.height = canvasCfg.canvasSize[1];
    ctx.webkitImageSmoothingEnabled = false;
    ctx.mozImageSmoothingEnabled = false;
    ctx.imageSmoothingEnabled = false;
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

  async render(sequence) {

    const _bg = backgrounds.getAll();
    const _tiles = tiles.getAll();
    const _entities = entities.getAll();

    viewport.update(_tiles, _entities, _bg);

    collision.setTiles(_tiles);
    collision.setEntities(_entities);

    grid.setTiles(_tiles);

    backgrounds.next(sequence);
    tiles.next(sequence);
    entities.next(sequence);

    this.ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);

    for (const bg of _bg) {
      // todo: temporary bg fix
      // reference issue during scale, image loading issue when trying to avoid
      // scaling affecting the bg object ( thats why we clone before draw )
      if (!bg.img) {
        const img = await this._loadImage(bg.sprite.img);
        bg.img = img;
      }
      this._draw(clone(bg));
    }

    for (const tile of _tiles) {
      this._draw(tile);
    }

    for (const entity of _entities) {
      velocity.next(sequence, entity, this.ctx);
      const debug = collision.isColliding(entity);
      grid.getContainingGrid(entity);
      this._draw(entity);
      this._drawDebug(debug);
    }

    this._drawOnce(sequence);
    grid.debug(this.ctx);
  }

  /**
   * Default render type
   * @param object
   * @return {Promise<void>}
   * @private
   */
  async _draw(object) {
    let img = object.img;

    // cache image load
    // load image and assign back to tile
    // - loading image before rendering prevent's
    //   unnecessary sprite loading for things that
    //   are not yet necessary to be rendered
    if (!img) {
      img = await this._loadImage(object.sprite.img);
      object.img = img;
    }

    // prepare sprite drawing
    const spriteLocation = object.sprite.location;
    const spriteSize = object.sprite.size;
    const canvasLocation = [object.location.x, object.location.y];
    const canvasSize = object.size || [canvasCfg.blockSize, canvasCfg.blockSize];

    this.ctx.drawImage(
      img,
      ...spriteLocation,
      ...spriteSize,
      ...scale.location(canvasLocation, object),
      ...scale.size(canvasSize, object),
    );

    // has username ?
    // if yes, then render username as text
    if (object.options && object.options.clientUsername) {
      const usernameLocation = [];
      usernameLocation[0] = canvasLocation[0] + 14;
      usernameLocation[1] = canvasLocation[1] - 10;
      // this.ctx.font = '10px Press Start 2P';
      this.ctx.font = '12px Arial';
      this.ctx.fillStyle = 'black';
      this.ctx.fillText(object.options.clientUsername, ...usernameLocation);
    }

  }

  async _drawDebug(params) {
    if (params) {
      // this.ctx.beginPath();
      // this.ctx.lineWidth = '4';
      // this.ctx.rect(...params);
      // this.ctx.stroke();
    }
  }

  async _drawOnce(sequence) {
    // return;
    // const color = (sequence % 2 === 0) ? '#f8a100' : '#15f80c';
    // draw JOIN ME AT:
    // http://goo.gl/MP4g94
    // const txt = [100, 100];
    // this.ctx.font = '50px Arial';
    // this.ctx.fillStyle = '#f8a100';
    // this.ctx.shadowColor = 'black';
    // this.ctx.shadowOffsetX = 3;
    // this.ctx.shadowOffsetY = 3;
    // this.ctx.shadowBlur = 3;
    // this.ctx.fillText('Join game here: http://goo.gl/MP4g94', ...txt);
    // this.ctx.shadowOffsetX = 0;
    // this.ctx.shadowOffsetY = 0;
    // this.ctx.shadowBlur = 0;
  }

};
