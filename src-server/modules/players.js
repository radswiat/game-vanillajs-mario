import chalk from 'chalk';

export default new class Players {

  players = {};

  getAll() {
    return Object.keys(this.players).map((key) => this.players[key]);
  }

  add({ playerId, player, client }) {
    console.log(chalk.greenBright('--- [player]: add player'));
    console.log(playerId);
    console.log(player);
    // decorate player with clientId for easy access
    player.id = playerId;
    // add player to the list
    this.players[playerId] = player;
    // inform others about new player joined
    client.broadcast.emit('player:joined', player);
  }

  remove({ playerId, client }) {
    console.log(chalk.greenBright('--- [player]: remove player'));
    console.log(playerId);
    // remove player from the list
    delete this.players[playerId];
    // inform others about player left
    client.broadcast.emit('player:left', playerId);
  }

};
