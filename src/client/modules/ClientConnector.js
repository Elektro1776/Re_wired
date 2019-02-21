import React from 'react';
import BaseConnector from './ClientBaseConnector';
import combine from '../../common/util/combine';

export default class ClientConnector extends BaseConnector {
  constructor(...features) {
    super(...features);
    this.route = combine(features, arg => arg.route);
  }

  get routes() {
    return this.route.map((route, idx) => {
      return React.cloneElement(route, { key: idx });
    });
  }
}
