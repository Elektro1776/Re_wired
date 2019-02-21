/*eslint-disable no-unused-vars*/
import React from 'react';
import { graphql, compose } from 'react-apollo';

import HomeView from '../components/HomeView';

class Home extends React.Component {
  render() {
    return <HomeView {...this.props} />;
  }
}

const HomeWithApollo = compose()(Home);

export default HomeWithApollo;
