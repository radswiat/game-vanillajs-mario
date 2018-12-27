import React, { Component, Fragment } from 'react';

import { gameCfg } from 'config';
import Game from 'game/app/app';
import GameMenu from 'game-menu/app/components/modules/game-menu';
import PlayersList from 'game-menu/app/components/modules/players-list';

export default class GameScreen extends Component {

  game = new Game();

  componentDidMount() {
    this.startGame();
  }

  startGame = (mapId = 'default') => {
    setTimeout(() => {
      this.game.init({ mapId });
    }, 0);
  };

  render() {
    return (
      <Fragment>
        <GameMenu
          menu={[
            {
              name: 'Default',
              fn: () => this.startGame(),
            },
            {
              name: 'Perf test 1',
              fn: () => this.startGame('perf1'),
            },
            {
              name: 'Live game',
              fn: () => this.startGame('real-level-1'),
            },
            {
              name: 'Wall',
              fn: () => this.startGame('wall'),
            },
            {
              name: 'Reset game',
              fn: () => this.game.reset(),
            },
            {
              type: 'flex',
            },
            {
              name: () => `Scaling ${gameCfg.enableScaling ? 'ON' : 'OFF'}`,
              fn: () => {
                gameCfg.enableScaling = !gameCfg.enableScaling;
              },
            },
          ]}
        />
        <PlayersList />
        <div id="debug_heartbeats" />
      </Fragment>
    );
  }
}
