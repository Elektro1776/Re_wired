import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import universal from 'react-universal-component';

// import UniversalComponent from './UniversalComponent';

const Loading = () => <div>Loading:::</div>;
const determineHowToLoad = ({ page }) => {
  const pageReturn = () => page();
  const importReturn = () => import(`./${page}`);
  return typeof page !== 'string' ? pageReturn() : importReturn();
};
const UniversalComponent = universal(determineHowToLoad, {
  loading: Loading
});

export default class Routes extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  beforeChange = ({ isSync }) => {
    if (!isSync) {
      this.setState({ loading: true, error: false });
    }
  };

  afterChange = ({ isSync, isServer, isMount }) => {
    if (!isSync) {
      this.setState({ loading: false, error: false });
    } else if (!isServer && !isMount) {
      this.setState({ done: true, error: false });
    }
  };

  handleError = error => {
    console.log('ERROR::', error);
    this.setState({ error: true, loading: false });
  };
  render() {
    return (
      <Switch>
        <Route
          exact
          path="/"
          render={({ staticContext }) => {
            console.log('RENDER:::');
            //NOTE: some how location variable is injected at runtime and exists for client purposes
            // to determine what site we should go to and load correct data and theme
            //eslint-disable-next-line
            const site = staticContext ? staticContext.site : location.hostname.split('.')[0];
            return (
              <UniversalComponent
                page={() => import(/* webpackChunkname: "Home"*/ '../modules/home/containers/Home')}
                onBefore={this.beforeChange}
                onAfter={this.afterChange}
                onError={this.handleError}
              />
            );
          }}
        />
      </Switch>
    );
  }
}
