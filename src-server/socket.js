import io from 'socket.io';
import wildcard from 'socketio-wildcard';

import players from './modules/players';

export default class Socket {

  players = [];

  constructor(serverHttp) {
    this.io = io(serverHttp);
    this.io.use(wildcard());
    this.io.on('connection', this.onNewConnection.bind(this));
  }

  onNewConnection(client) {

    // if (this.players.length) {
    //   this.players.map((player) => {
    //     client.emit('newPlayer', player);
    //   });
    // }

    client.on('disconnect', () => {
      this.handlePlayerDisconnect(client);
    });

    client.on('*', ({ data: [action, { payload }, cb] }) => {
      // handle new player joining
      if (action === 'player:joining') this.handleNewPlayerConnection(client, payload);
      if (action === 'request:all:players') this.getAllPlayers(client, cb);
      if (action === 'player:update') this.handlePlayerUpdate(client, payload);
      this.io.emit(action, payload);
    });
  }

  /**
   * Handle new player connection
   * - add player to list of players
   * - broadcast this new player to all others
   * @param client
   * @param payload
   */
  handleNewPlayerConnection(client, player) {
    players.add({
      playerId: client.id,
      player,
      client,
    });
  }

  handlePlayerDisconnect(client) {
    players.remove({ playerId: client.id, client });
  }

  handlePlayerUpdate(client, payload) {
    client.broadcast.emit(`player:update:${client.id}`, payload);
  }

  getAllPlayers(client, cb) {
    let allPlayers = players.getAll();
    // remove the client from all players
    allPlayers = allPlayers.filter((player) => player.id !== client.id);
    if (typeof cb === 'function') {
      cb(allPlayers);
    }
  }
}
