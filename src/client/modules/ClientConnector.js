import React from 'react';
// import { Route } from 'react-router-dom';
// import universal from 'react-universal-component';

import BaseConnector from './ClientBaseConnector';
import combine from '../../common/util/combine';

// const UniversalComponent = universal(props => import(`./${props.page}`))
export default class ClientConnector extends BaseConnector {
  constructor(...features) {
    super(...features);
    this.route = combine(features, arg => arg.route);
  }

  get routes() {
    return this.route.map((route, idx) => {
      // console.log('ROUTE ', route);
      // console.log('IDX::', idx);

      // const renderRoute = (path, component) => {
      //   console.log('PATH:', path );
      //
      //   return (
      //     <Route
      //       path={path}
      //       render={({ staticContext }) => {
      //         console.log('Static Context');
      //         const site = staticContext ? staticContext.site : location.hostname.split('.')[0];
      //         console.log('SITE::', site);
      //         <UniversalComponent page={component} />
      //         return <UniversalComponent page={component} />
      //       }}
      //     />
      //   );
      // };
      // const Dummy = () => <Route path={'/'} render={() => <div>Dummy</div>} />;
      const Component = React.cloneElement(route, { key: idx });
      // console.log('COMPONENT', Component);
      return Component;
    });
  }
}
