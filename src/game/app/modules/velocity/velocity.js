import clone from 'lodash/cloneDeep';
import { scale } from 'engine/renderer';

export default new class Velocity {

  next(sequence, object, ctx) {
    this._applyVelocity(sequence, object, ctx);
    // const predictionLocations = this._gatherPredictions(200, sequence + 1, clone(object), ctx);
    // if (predictionLocations)
    // this._drawPredictions(predictionLocations, ctx);
  }

  _applyVelocity(sequence, object, ctx) {

    // // use constant gravity force
    // // to pull the entity down
    // object.velocity.y -= 0.95;

    // slow down jump
    if (object.velocity.y) {
      object.velocity.y -= object.gravity;
      if (object.velocity.y < 0 && object.isCollidingBottom) {
        object.velocity.y = 0;
      }
    }
    // apply constant gravity force
    else {
      object.velocity.y -= object.gravity;
    }

    // make char slowly stopping
    if (object.velocity.x !== 0) {
      // increase precision
      if (Math.abs(object.velocity.x) <= 0.5) {
        object.velocity.x = 0;
      }
      object.velocity.x -= 1.0 * Math.sign(object.velocity.x);
    }

    object.location.x += object.velocity.x;
    object.locationSync.x += object.velocity.x;

    object.location.y -= object.velocity.y;
    object.locationSync.y -= object.velocity.y;


    return object;
  }

  _gatherPredictions(limit, sequence, object, ctx) {
    if (!object.experimentalVelocity) return;
    if (!limit) return;
    limit--;

    object = this._applyVelocity(sequence, object, ctx);
    const locations = this._gatherPredictions(limit, sequence, clone(object), ctx);
    return [object.location].concat(locations);
  }

  _drawPredictions(locations, ctx) {
    ctx.beginPath();
    ctx.strokeStyle = '#0b0b0b';
    ctx.lineWidth = '1';
    locations.reduce((last, current) => {
      if (last && current) {
        ctx.moveTo(...scale.point([last.x + 32, last.y + 32]));
        ctx.lineTo(...scale.point([current.x + 32, current.y + 32]));
      }
      return current;
    });
    ctx.stroke();
  }

};
