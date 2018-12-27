import Entity from 'core/entity';
import { socket } from 'engine/sync';
import merge from 'lodash/merge';

export default class PlayerSync extends Entity {

  debugCanCollide = true;

  acceleration = 1.35;
  maxSpeed = 16;
  jumpForce = 15;
  jumpForceMax = 26;

  next(sequence) {

    socket.on(`player:update:${this.options.clientId}`, (data) => {
      merge(this, data);
    });

    // implement sprite animation
    super.nextAnimateSprites(sequence);
  }

}
