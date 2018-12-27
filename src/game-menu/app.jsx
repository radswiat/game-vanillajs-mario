import React, { Fragment } from 'react';
import { render } from 'react-dom';
import createBrowserHistory from 'history/createHashHistory';

import routes from 'game-menu/app/routes';

// import 'config';
// import 'flexibility';
// import 'styles/main.scss';

/**
 * React App
 */
export default new class App {

  /**
   * Bootstrap
   *
   * @return { App }
   */
  static bootstrap() {
    return new App();
  }

  constructor() {
    this.createHistory();
    this.render();
  }

  /**
   * @name createHistory
   * @description Creates browser history stack
   */
  createHistory() {
    this.history = createBrowserHistory();
  }

  render() {
    render(
      <Fragment>
        {routes(this.history)}
      </Fragment>,
      document.getElementById('root'),
    );
  }
};
