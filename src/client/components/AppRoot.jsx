import React, { Component } from 'react';
import { hot } from 'react-hot-loader';
import { BrowserRouter as Router } from 'react-router-dom';
import Routes from './Routes.jsx';

class AppRoot extends Component {
  render() {
    return (
      <Router>
        <Routes />
      </Router>
    );
  }
}

export default hot(module)(AppRoot);
