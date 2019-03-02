import React from 'react';
import { Route } from 'react-router-dom';
import universal from 'react-universal-component';

// import { UniversalComponent } from '../common/components/web';

import Feature from '../ClientConnector';

const Loading = () => <div>Loading:::</div>;
const UniversalComponent = universal(() => import(`./Home`), {
  loading: Loading
});

// const Route = () => {
//   return (
//
//   )
// }
export default new Feature({
  route: [
    // {
    //   page: 'Home',
    //   exact: true,
    //   path: '/',
    //   component: 'home/containers/Home'
    // }
    <Route exact path="/">
      {/* <Loading /> */}
      <UniversalComponent />
      {/* <UniversalComponent page={'Home'} /> */}
    </Route>
  ]
});
