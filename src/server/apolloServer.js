import { ApolloServer } from 'apollo-server-express';
// import { formatResponse } from 'apollo-logger';
import modules from './modules';
import schema from './api/schema';
// import settings from '../settings';
// import log from '../../common/log';

export default () => {
  console.log('APOLLO SERVER CREATED:::::');
  // const schema = await createSchema();
  //console.log('SCHEMA HERE', schema);
  return new ApolloServer({
    schema,
    context: async ({ req, res }) => ({ ...(await modules.createContext(req)), req, res }),
    debug: true,
    // formatResponse: (response, options) =>
    //   settings.app.logging.apolloLogging
    //     ? formatResponse({ logger: log.debug.bind(log) }, response, options)
    //     : response,
    // tracing: !!settings.engine.apiKey,
    // cacheControl: !!settings.engine.apiKey,
    // engine: settings.engine.apiKey
    //   ? {
    //       apiKey: settings.engine.apiKey
    //     }
    //   : false,
    playground: false
  });
};
