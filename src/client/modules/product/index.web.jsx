import React from 'react';
import { Route } from 'react-router-dom';
import universal from 'react-universal-component';
// import { UniversalComponent } from '../common/components/web';
// import reducers from './reducers';

import Feature from '../ClientConnector';

const Loading = () => <div>Loading:::</div>;
const UniversalComponent = universal(props => import(`./${props.page}`), {
  loading: Loading
});

export default new Feature({
  route: [
    <Route exact path="/product">
      <UniversalComponent page={'containers/Product'} />
    </Route>
  ]
});
