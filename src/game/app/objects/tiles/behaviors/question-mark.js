export default class QuestionMark {

  constructor({ blockId, location, options, animate, sprite }) {
    this.blockId = blockId;
    this.location = location;
    this.options = options;
    this.animate = animate;
    this.sprite = sprite;
  }

  next(sequence) {
    if (sequence % this.animate.speed !== 0) return;
    let sequenceId = this.animate.sequence.indexOf(this.sprite.location) + 1;
    if (sequenceId >= this.animate.sequence.length) {
      sequenceId = 0;
    }
    this.sprite.location = this.animate.sequence[sequenceId];
  }
}
