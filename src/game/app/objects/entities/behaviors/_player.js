import controls from 'engine/controls';
import Entity from 'core/entity';
import { socket } from 'engine/sync';
import viewport from 'modules/viewport';

import { easeInCirc } from 'utilities/easing';

export default class Player extends Entity {

  // player sync id for multiplayer game
  syncId = null;

  acceleration = 1.35;
  maxSpeed = 16;
  jumpForce = 15;
  jumpForceMax = 26;

  next(sequence) {

    // console.log(this.location);

    socket.emit('player:update', {
      location: { x: this.location.x, y: this.location.y },
      easingStart: this.easingStart,
      velocity: this.velocity,
      isJumping: this.isJumping,
    });

    controls.isPressed('ArrowRight', () => {
      if (!this.easingStart) this.easingStart = sequence;
      this.velocity.x += this.acceleration + (easeInCirc(sequence - this.easingStart) / 10);
      if (Math.abs(this.velocity.x) > this.maxSpeed) {
        this.velocity.x = this.maxSpeed;
        this.easingStart = null;
      }
    });

    controls.isPressed('ArrowLeft', () => {
      if (!this.easingStart) this.easingStart = sequence;
      this.velocity.x -= this.acceleration + (easeInCirc(sequence - this.easingStart) / 10);
      if (Math.abs(this.velocity.x) > this.maxSpeed) {
        this.velocity.x = -this.maxSpeed;
        this.easingStart = null;
      }
    });

    controls.isPressed('ArrowUp', () => {
      this.isJumping = true;
      if (this.isMaxJumpForce) return;
      this.velocity.y += this.jumpForce;
      // console.log('jump');
      if (this.velocity.y > this.jumpForceMax) {
        this.isMaxJumpForce = true;
        this.velocity.y = this.jumpForceMax;
      }
    });

    // implement sprite animation
    super.nextAnimateSprites(sequence);
  }

}
