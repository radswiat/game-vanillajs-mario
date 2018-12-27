import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { socket } from 'engine/sync';

import './players-list.scss';

export default class PlayersList extends Component {

  static propTypes = {};

  state = {
    players: [],
  };

  async componentDidMount() {

    const players = await socket.emit('request:all:players');
    this.setState({
      players,
    });

    socket.on('player:joined', (player) => {
      const players = this.state.players;
      players.push(player);
      this.setState({
        players,
      });
    });

    socket.on('player:left', (playerId) => {
      const players = this.state.players.filter((player) => player.id !== playerId);
      this.setState({
        players,
      });
    });
  }

  render() {
    return null
    return (
      <div className="players-list">
        <h2>On-line:</h2>
        {this.state.players.map((data, key) => {
          return (
            <div key={key}>
              {key + 1}: {data.username}
            </div>
          );
        })}
      </div>
    );
  }
}
