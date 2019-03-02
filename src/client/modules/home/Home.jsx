/*eslint-disable no-unused-vars*/
import React from 'react';
import { graphql, compose } from 'react-apollo';
import { hot } from 'react-hot-loader';

import HomeView from './components/HomeView';

class Home extends React.Component {
  render() {
    return <HomeView {...this.props} />;
  }
}

// hot(Home);

export default hot(Home);
