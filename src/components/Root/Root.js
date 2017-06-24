/* eslint-disable react/prefer-stateless-function */

import React, { Component, PropTypes } from 'react';
import { Router } from 'react-router';

/**
 * So that react-hot-loader works, you need a class component to hold the root of your app.
 * (This is the way react-hot-loader works, it will wrap the class, add proxy method to update them on the fly)
 */
export default class Root extends Component {
  static propTypes = {
    history: PropTypes.object,
    routes: PropTypes.object
  }
  render() {
    return (
      <Router history={this.props.history}>
        {this.props.routes}
      </Router>
    );
  }
}
