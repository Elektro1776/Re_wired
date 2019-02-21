import React from 'react';
import { Route } from 'react-router-dom';
import { UniversalComponent } from '../common/components/web';
// import reducers from './reducers';

import Feature from '../ClientConnector';

export default new Feature({
  route: [
    <Route exact path="/product">
      <UniversalComponent page={'product/containers/Product'} />
    </Route>
  ]
});
