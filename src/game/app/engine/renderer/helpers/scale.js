import { canvasCfg, gameCfg } from 'config';

export default new class Scale {

  get scaleX() {
    return canvasCfg.canvasSize[0] / 820 / 2.9; // 820
  }

  get scaleY() {
    return canvasCfg.canvasSize[1] / 274 / 3.4; // 274
  }

  location(canvasLocation, object) {
    if (object.scale === false) return canvasLocation;
    canvasLocation[1] += (canvasCfg.blockSize * 3);
    if (!gameCfg.enableScaling) return canvasLocation;
    canvasLocation[0] *= this.scaleX;
    canvasLocation[1] *= this.scaleY;
    return canvasLocation;
  }

  size(canvasSize, object) {
    if (object.scale === false) return canvasSize;
    if (!gameCfg.enableScaling) return canvasSize;
    canvasSize[0] *= this.scaleX;
    canvasSize[1] *= this.scaleY;
    return canvasSize;
  }

  point(point) {
    if (!gameCfg.enableScaling) return point;
    point[0] /= this.scaleX;
    point[1] /= this.scaleY;
    return point;
  }
};
