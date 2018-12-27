import uuid from 'uuid';
import Vector from 'victor';
import { getNextAnimationSequence } from 'utils';

export default class Entity {

  id = uuid.v4();

  viewport = new Vector(0, 0);

  experimentalVelocity = true;

  // gravity strength for the entity
  // this works like a weight of the entity
  // @default 1.6
  gravity = 1.6;

  // velocity
  // base speed in given direction
  // @vector
  velocity = new Vector(0, 0);

  // acceleration
  // how fast the entity will be gaining speed
  acceleration = null;

  // max speed
  // the maximum speed that entity can reach
  maxSpeed = null;

  // jump force
  // similar to acceleration but for the Y axis
  jumpForce = null;

  // jump force max
  // similar to max speed
  // but for the jump force
  jumpForceMax = null;

  // has reach max force jump
  // indication flag if the entity has reach max jump force
  // if it will - jump will be blocked till it will hit the ground
  // @resets when touching the ground
  isMaxJumpForce = false;

  // is jumping
  // applied when arrow up is pressed
  // this is important for sprite animation
  // as we can't guess if entity is jumping or falling
  // without assigning it with the arrow up key
  isJumping = false;

  constructor({ blockId, location, options, animate, sprite }) {
    this.blockId = blockId;
    this.location = location;
    this.locationSync = new Vector(location.x, location.y);
    this.options = options;
    this.animate = animate;
    this.sprite = sprite;
  }

  /**
   * Fired when entity touch ground
   * - will be constantly firing when standing on the ground
   */
  hasTouchedGround() {
    this.isMaxJumpForce = false;
    this.isJumping = false;
  }

  /**
   * Fire when entity collides top
   */
  hasCollidedTop() {
    this.velocity.y = 0;
  }

  hasCollidedRight() {
    // console.warn('collided!');
    // this.velocity.x = 0;
  }

  hasCollidedLeft() {
    // this.velocity.x = 0;
  }

  hasStopped(sequence) {
    this.easingStart = sequence;
  }

  hasReachGroundEdge() {

  }

  nextAnimateSprites(sequence) {
    // instead of trying to choose sprites
    // lets try to predict what sprite should be applied
    // based on the velocity
    let spriteAnimateType;
    let spriteAnimateDirection = 'right';
    // set the animation direction
    if (Math.sign(this.velocity.x) === 1) spriteAnimateDirection = 'right';
    if (Math.sign(this.velocity.x) === -1) spriteAnimateDirection = 'left';
    if (Math.sign(this.velocity.x) === 0) spriteAnimateDirection = this.lastDirection || 'right';
    this.lastDirection = spriteAnimateDirection;
    // if staying steady
    spriteAnimateType = (this.velocity.x === 0) ? 'stand' : 'walk';
    // if jumping
    spriteAnimateType = (this.isJumping) ? 'jump' : spriteAnimateType;
    if (sequence % this.animate.speed !== 0) return;
    this.sprite.location = getNextAnimationSequence(
      this.sprite.location,
      this.animate.sequences[spriteAnimateType][spriteAnimateDirection]
    );

    if (this.velocity.x === 0) {
      this.hasStopped(sequence);
    }
  }

}
