export default class PushBlock {

  direction = 1;

  constructor({ blockId, location, options, animate, sprite }) {
    this.blockId = blockId;
    this.location = location;
    this.options = options;
    this.animate = animate;
    this.sprite = sprite;
  }

  next(sequence) {
    if (sequence % 50 === 0) {
      this.direction = this.direction * -1;
    }

    this.location.x += 2 * this.direction;
  }
}
