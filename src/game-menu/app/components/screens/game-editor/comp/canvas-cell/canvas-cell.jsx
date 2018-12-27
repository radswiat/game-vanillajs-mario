import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Renderer from './renderer';

export default class Test extends Component {

    static propTypes = {
      tile: PropTypes.object.isRequired,
      size: PropTypes.number.isRequired,
    };

    componentDidMount() {
      new Renderer(this.ref, this.props.tile, this.props.size);
    }

    componentWillUpdate() {
      new Renderer(this.ref, this.props.tile, this.props.size);
    }

    render() {
      return (
        <canvas ref={(ref) => this.ref = ref} />
      );
    }

}
