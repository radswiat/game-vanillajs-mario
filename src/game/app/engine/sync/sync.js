import ls from 'local-storage';

import entities from 'objects/entities';

import socket from './socket';

export default new class Sync {

  constructor() {

    // // when starting up
    // // let the server knows that new player has joined!
    // const username = ls.get('username');
    // if (!username) return;
    // socket.emit('player:joining', {
    //   username,
    // });

    // this.getAllPlayers();

    // // handle new player join
    // // create new player ( ghost ) when server emits newPlayer
    // socket.on('player:joined', ({ id, username }) => {
    //   entities.create('LUIGI_SYNC', { location: [100, 100] }, {
    //     static: false,
    //     theme: 'default',
    //     clientId: id,
    //     clientUsername: username,
    //   });
    // });

    // socket.on('player:left', (id) => {
    //   Object.entries(entities.entities).map(([key, entity]) => {
    //     if (entity.blockId !== 'LUIGI_SYNC') return;
    //     if (entity.options.clientId === id) {
    //       delete entities.entities[key];
    //     }
    //   });
    // });


  }

  async getAllPlayers() {
    // const players = await socket.emit('request:all:players');
    // players.map((player) => {
    //   entities.create('LUIGI_SYNC', { location: [100, 100] }, {
    //     static: false,
    //     theme: 'default',
    //     clientId: player.id,
    //     clientUsername: player.username,
    //   });
    // });
  }

};
