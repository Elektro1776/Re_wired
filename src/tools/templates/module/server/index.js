import $Module$ from './sql';
import schema from './schema.graphql';
import createResolvers from './resolvers';
import Feature from '../BaseConnector';

export default new Feature({
  schema,
  createResolversFunc: createResolvers,
  createContextFunc: () => ({ $Module$: new $Module$() })
});
