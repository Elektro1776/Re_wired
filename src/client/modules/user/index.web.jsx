import React from 'react';
import { Route } from 'react-router-dom';
import { UniversalComponent } from '../common/components/web';
// import User from './containers/User';
// import reducers from './reducers';

import Feature from '../ClientConnector';

export default new Feature({
  route: [
    <Route path="/user">
      <UniversalComponent page={'user/containers/User'} />
    </Route>
  ]
});
