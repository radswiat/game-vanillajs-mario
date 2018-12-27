import controls from 'engine/controls';
import Entity from 'core/entity';

import { easeInCirc } from 'utilities/easing';

export default class Player2 extends Entity {

  acceleration = 1.2;
  maxSpeed = 13;
  jumpForce = 15;
  jumpForceMax = 26;

  next(sequence) {

    controls.isPressed('d', () => {
      if (!this.easingStart) this.easingStart = sequence;
      this.velocity.x += this.acceleration + (easeInCirc(sequence - this.easingStart) / 10);
      if (Math.abs(this.velocity.x) > this.maxSpeed) {
        this.velocity.x = this.maxSpeed;
        this.easingStart = null;
      }
    });

    controls.isPressed('a', () => {
      if (!this.easingStart) this.easingStart = sequence;
      this.velocity.x -= this.acceleration + (easeInCirc(sequence - this.easingStart) / 10);
      if (Math.abs(this.velocity.x) > this.maxSpeed) {
        this.velocity.x = -this.maxSpeed;
        this.easingStart = null;
      }
    });

    controls.isPressed('w', () => {
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
