import React, { Component } from "react";
import PropTypes from "prop-types";
import { withRouter } from "react-router-dom";
import ls from "local-storage";

import "./welcome-screen.scss";

@withRouter
export default class WelcomeScreen extends Component {
  static propTypes = {
    history: PropTypes.object.isRequired
  };

  startGame = () => {
    this.props.history.push("/game-screen");
  };

  startGameEditor = () => {
    this.props.history.push("/game-editor");
  };

  multiplayerUsername = () => {
    const username = prompt("Username");
    ls.set("username", username);
    this.props.history.push("/game-screen");
  };

  render() {
    return (
      <div className="welcome-screen">
        <div className="welcome-screen__button" onClick={this.startGame}>
          1 Player game
        </div>
        <div className="welcome-screen__button" onClick={this.startGame}>
          2 Player game
        </div>
        <div className="welcome-screen__button">Multiplayer (offline)</div>
        <div className="welcome-screen__button" onClick={this.startGameEditor}>
          Game editor
        </div>
      </div>
    );
  }
}
