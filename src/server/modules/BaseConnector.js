import combine from '../../common/util/combine';

export default class BaseConnector {
  constructor({ ...features }) {
    this.createResolversFunc = combine(features, arg => arg.createResolversFunc);
  }
}
