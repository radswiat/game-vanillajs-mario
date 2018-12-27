import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import clone from 'lodash/cloneDeep';
import flatten from 'lodash/flatten';

import { canvasCfg } from 'config';
import tiles from 'resources/tiles/tiles';
import entities from 'resources/entities/entities';
import GameMenu from 'game-menu/app/components/modules/game-menu';

import CanvasCell from './comp/canvas-cell/canvas-cell';

import './game-editor.scss';

@withRouter
export default class GameEditor extends Component {

  static propTypes = {
    history: PropTypes.object.isRequired,
  };

  selectedBlock = null;

  state = {
    grid: null,
  };

  componentWillMount() {
    const grid = [];
    for (let x = 40; x >= 0; x--) {
      for (let y = 11; y >= 0; y--) {
        if (typeof grid[x] === 'undefined') grid[x] = [];
        grid[x][y] = {};
      }
    }
    this.setState({
      grid,
    });
  }

  handleSelectBlock = (type, id, block) => {
    this.selectedBlockType = type;
    this.selectedBlockId = id;
    this.selectedBlock = block;
  };

  handleCreateBlock = (x, y) => {
    console.log('create!');
    const grid = this.state.grid;
    const block = clone(this.selectedBlock);
    block.type = this.selectedBlockType;
    block.id = this.selectedBlockId;
    block.location = [x, y];
    grid[x][y] = block;
    this.setState({
      grid,
    });
  };

  getGameData = () => {
    return flatten(clone(this.state.grid)).filter((o) => Object.keys(o).length).map((o) => {
      o.location[0] *= canvasCfg.blockSize;
      o.location[1] *= canvasCfg.blockSize;
      return o;
    });
  }

  handleMenuSaveToFile = () => {
    console.log((this.getGameData()));
    const dataStr = `data:text/json;charset=utf-8,${encodeURIComponent(JSON.stringify(this.getGameData()))}`;
    const dlAnchorElem = document.getElementById('downloadAnchorElem');
    dlAnchorElem.setAttribute('href', dataStr);
    dlAnchorElem.setAttribute('download', 'map.json');
    dlAnchorElem.click();
  };

  handleMenuPlay = () => {
    window.gameMap = clone(this.getGameData());
    this.props.history.push('/game-screen');
  };

  render() {
    return (
      <div className="game-editor">
        <GameMenu
          menu={[
            {
              name: 'SAVE TO FILE',
              fn: this.handleMenuSaveToFile,
            },
            {
              name: 'PLAY',
              fn: this.handleMenuPlay,
            },
          ]}
        />
        <div className="editor">
          {this.state.grid.map((x, keyX) => (
            <div className="editor__row" key={keyX}>
              {x.map((y, keyY) => (
                <div className="editor__cell" key={keyY} onClick={() => this.handleCreateBlock(keyX, keyY)}>
                  {!Object.keys(y).length &&
                    <span />
                  }
                  {!!Object.keys(y).length &&
                    <span>
                      <CanvasCell tile={y} size={canvasCfg.blockSize} />
                    </span>
                  }
                </div>
              ))}
            </div>
          ))}
        </div>
        <div className="palette">
          <div className="palette__blocks">
            {Object.entries(tiles).map(([key, tile]) => {
              return (
                <div
                  key={key}
                  style={{ border: '1px solid black' }}
                  onClick={() => this.handleSelectBlock('tiles', key, tile)}
                >
                  <CanvasCell tile={tile} size={28} />
                </div>
              );
            })}
          </div>
          <div className="palette__blocks">
            {Object.entries(entities).map(([key, entity]) => {
              return (
                <div
                  key={key}
                  style={{ border: '1px solid black' }}
                  onClick={() => this.handleSelectBlock('entities', key, entity)}
                >
                  <CanvasCell tile={entity} size={28} />
                </div>
              );
            })}
          </div>
        </div>
        <a id="downloadAnchorElem" />
      </div>
    );
  }
}
