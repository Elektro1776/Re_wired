import React from 'react';
import { Route, Link, Switch } from 'react-router-dom';
import universal from 'react-universal-component';
const Loading = () => (
  <div>Loading:::</div>
)
const UniversalComponent = universal(
  props => import(`./${props.page}`), {
  loading: Loading
}
);

export default () => (
  <div>
    <div className="nav">
      <Link to="/">Home</Link>
      <Link to="/about">About</Link>
      <Link to="/counter">Counter</Link>
    </div>
    <Switch>
      <Route exact path="/">
        <UniversalComponent page={'Home'}/>
      </Route>
      <Route path="/about" render={({ staticContext }) => {
        const site = staticContext ? staticContext.site : location.hostname.split(".")[0];
        return <UniversalComponent page={'About'} site={site} />
      }}>
      </Route>
      <Route path="/counter">
        <UniversalComponent page={'Counter'}/>
      </Route>
    </Switch>
  </div>
)
