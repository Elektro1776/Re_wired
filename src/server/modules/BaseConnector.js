import { mergeLeft } from 'ramda';
import combine from '../../common/util/combine';

export default class BaseConnector {
  constructor(...features) {
    this.schema = combine(features, arg => arg.schema);
    this.createResolversFunc = combine(features, arg => arg.createResolversFunc);
    this.createContextFunc = combine(features, arg => arg.createContextFunc);
  }
  get schemas() {
    return this.schema;
  }
  async createContext(req, res, connectionParams, webSocket) {
    let context = {};
    for (const createContextFunc of this.createContextFunc) {
      context = mergeLeft(context, await createContextFunc({ req, res, connectionParams, webSocket, context }));
    }
    return context;
  }
  createResolvers(pubsub) {
    return mergeLeft({}, ...this.createResolversFunc.map(createResolvers => createResolvers(pubsub)));
  }
}
