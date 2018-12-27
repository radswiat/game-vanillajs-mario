import Entity from 'core/entity';
import Vector from 'victor';

export default class Duck extends Entity {

  velocity = new Vector(13, 0);
  acceleration = 1.2;
  maxSpeed = 3;
  gravity = 0.5;
  lastLocationX = -100000;

  permanentMoveDirection = -1;

  hasReachGroundEdge() {
    // console.log(Math.abs(this.lastLocationX - this.location.x));
    if (Math.abs(this.lastLocationX - this.location.x) < 100) return;
    this.lastLocationX = this.location.x;
    this.permanentMoveDirection *= -1;
  }

  next(sequence) {

    // switch direction
    // if (this.location.x > 500) {
    //   this.permanentMoveDirection *= -1;
    // }
    //
    // // switch direction
    // if (this.location.x < -100) {
    //   this.permanentMoveDirection *= -1;
    // }

    // set velocity
    this.velocity.x = this.maxSpeed * this.permanentMoveDirection;

    // implement sprite animation
    super.nextAnimateSprites(sequence);
  }
}
