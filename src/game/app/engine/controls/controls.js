import { isDefined } from 'utils';

export default new class Controls {

  keys = {};

  registeredCallbacks = {};

  constructor() {
    console.warn('register controls');
    window.addEventListener('keydown', this._handleKeyDown);
    window.addEventListener('keyup', this._handleKeyUp);
  }

  _handleKeyDown = ({ key, keyCode }) => {
    // console.log(key);
    this.keys[key] = {
      active: true,
    };
  };

  _handleKeyUp = ({ key, keyCode }) => {
    this.keys[key] = {
      active: false,
    };
  };

  isPressed(key, cb) {
    if (!isDefined(this.keys[key])) return;
    if (!this.keys[key].active) return;
    cb();
  }
};
