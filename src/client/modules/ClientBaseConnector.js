import React from 'react';
import combine from '../../common/util/combine';

export default class BaseConnector {
  constructor({ ...features }) {
    this.route = combine(features, arg => arg.route);
  }

  get routes() {
    return this.route.map(route => {
      React.cloneElement(route);
    });
  }
}
