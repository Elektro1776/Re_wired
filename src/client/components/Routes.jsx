import React from 'react';
import { Route, Link, Switch } from 'react-router-dom';
import universal from 'react-universal-component';

const Loading = () => <div>Loading:::</div>;
const UniversalComponent = universal(props => import(`./${props.page}`), {
  loading: Loading
});

export default () => (
  <div>
    <div className="nav">
      <Link to="/">Home</Link>
      <Link to="/about">About</Link>
      <Link to="/counter">Counter</Link>
    </div>
    <Switch>
      <Route exact path="/">
        <UniversalComponent page={'Home'} />
      </Route>
      <Route
        path="/about"
        render={({ staticContext }) => {
          //NOTE: some how location variable is injected at runtime and exists for client purposes
          // to determine what site we should go to and load correct data and theme
          //eslint-disable-next-line
          const site = staticContext ? staticContext.site : location.hostname.split('.')[0];
          return <UniversalComponent page={'About'} site={site} />;
        }}
      />
      <Route path="/counter">
        <UniversalComponent page={'Counter'} />
      </Route>
    </Switch>
  </div>
);
