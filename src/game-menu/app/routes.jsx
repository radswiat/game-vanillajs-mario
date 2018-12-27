import React from 'react';
import { Router, Route } from 'react-router';

import Wrapper from 'game-menu/app/components/containers/wrapper';
import GameScreen from 'game-menu/app/components/screens/game-screen';
import WelcomeScreen from 'game-menu/app/components/screens/welcome-screen';
import GameEditor from 'game-menu/app/components/screens/game-editor';

// /**
//  * Dynamic router ( default usage of react-router )
//  * - this is normal usage of react router
//  * - just use router and routes to define your router
//  * @returns {XML}
//  */
export default (history) => {
  return (
    <Router history={history}>
      <Wrapper>
        <Route path="/" exact component={WelcomeScreen} />
        <Route path="/game-screen" exact component={GameScreen} />
        <Route path="/game-editor" exact component={GameEditor} />
      </Wrapper>
    </Router>
  );
};
