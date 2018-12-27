import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';

import './game-menu.scss';

export default class GameMenu extends Component {

  static propTypes = {
    menu: PropTypes.array.isRequired,
  };

  handleFn = (fn) => {
    fn();
    this.forceUpdate();
  };

  render() {
    return (
      <div className="game-menu">
        {this.props.menu.map((item, key) => (
          <Fragment key={key}>
            { item.name &&
              <Fragment>
                <div className="game-menu__element" onClick={() => this.handleFn(item.fn)}>
                  {typeof item.name === 'function' ? item.name() : item.name}
                </div>
                <div className="game-menu__separator" />
              </Fragment>
            }
            { item.type === 'flex' &&
              <span className="flex" />
            }
          </Fragment>
        ))}
      </div>
    );
  }
}
