import Vector from 'victor';

import Entity from 'core/entity';
import { easeInCirc } from 'utilities/easing';

export default class Bird extends Entity {

  velocity = new Vector(13, 0);
  acceleration = 1.2;
  maxSpeed = 13;
  gravity = 0;

  permanentMoveDirection = 1;

  next(sequence) {

    if (!this.easingStart) {
      this.easingStart = sequence;
    }

    // switch direction
    if (this.location.x > window.innerWidth + 100 && this.permanentMoveDirection === 1) {
      this.easingStart = sequence;
      this.permanentMoveDirection *= -1;
    }

    // switch direction
    if (this.location.x < -100 && this.permanentMoveDirection === -1) {
      this.easingStart = sequence;
      this.permanentMoveDirection *= -1;
    }

    // set velocity
    this.velocity.x = this.permanentMoveDirection * easeInCirc(sequence - this.easingStart) / 5; //this.maxSpeed * this.permanentMoveDirection;

    // implement sprite animation
    super.nextAnimateSprites(sequence);
  }
}
