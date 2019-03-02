import React, { Component } from 'react';
import { hot } from 'react-hot-loader';
import { BrowserRouter as Router } from 'react-router-dom';
import Routes from './Routes';

class Main extends Component {
  render() {
    return (
      <Router>
        <Routes />
      </Router>
    );
  }
}

export default hot(module)(Main);
