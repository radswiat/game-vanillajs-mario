import io from 'socket.io-client';

export default new class Sync {

  constructor() {
    // this.client = io(SOCKET_URL); //io('http://localhost:8081'); 'http://52.50.58.226'
  }

  on(eventName, cb) {
    // this.client.on(eventName, cb);
  }

  /**
   * Socket emit
   * @param {string} action
   * @param payload
   * @param params
   */
  emit(action, payload = {}, params = {}) {
    // return this._emitify(action, payload, params);
  }

  /**
   * Promise decorated emit
   * @param action
   * @param payload
   * @param params
   * @private
   */
  _emitify(action, payload, params) {
    // return new Promise((resolve, reject) => {
    //   this.client.emit(action, { payload, params }, (data) => {
    //     resolve(data);
    //   });
    // });
  }
};
