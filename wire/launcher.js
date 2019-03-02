
const path = require('path');
const fs = require('fs');
const cluster = require('cluster');
const { spawn } = require('child_process');
const webpack = require('webpack');
const bunyan = require('bunyan');
const waitOn = require('wait-on')
const { keys, find, propEq } = require('ramda');

const configServer = require('../wireWebpack/webpack.dev-server.js');
const configClient = require('../wireWebpack/webpack.dev-client.js');
const Stream = require('./stream');

const serverLogger = bunyan.createLogger({ name: 'server',
  streams: [
    {
      level: 'info',
      stream: process.stdout
    },
    {
      level: 'error',
      stream: process.stdout
    },
    {
      level: 'debug',
      stream: process.stdout
    }
  ]
});

const clientLogger = bunyan.createLogger({ name: 'web',
  streams: [
    {
      level: 'info',
      stream: process.stdout
    },
    {
      level: 'error',
      stream: process.stdout
    },
      {
        level: 'debug',
        stream: process.stdout
      }
  ]
});


const __WINDOWS__ = /^win/.test(process.platform);
const waitOnOpts = {
  resources: [
    'tcp:localhost:8080'
  ]
}
let server;
let startBackend = false;
let lastExitCode = 0;
let nodeDebugOpt;
process.on('SIGUSR2', () => {
  if (server) {
    server.kill('SIGUSR2')
  }
})

process.on('exit', () => {
  console.log(':::');
  if (server) {
    server.kill('SIGTERM');
  }
});
const spawnServer = (cwd, args, options, logger) => {
  console.log('SPAWN SERVER::', cwd, args, options);
  server = spawn('node', [...args], {
    stdio: [0, 1, 2],
    cwd,
    env: { ...process.env, LAST_EXIT_CODE: `${lastExitCode}` }
  });
  serverLogger.info(`Spawning ${['node', ...args].join(' ')}`)
   server.on('exit', (code, signal) => {
     console.log('CODE:::', code);
     console.log('EXIT:::', signal);

    lastExitCode = code;
    if (code === 250) {
      // App requested full reload
      startBackend = true;
    }
    serverLogger.info(`Backend stopped, exit code:`, code);
    server = undefined;
    runServer(cwd, options.serverPath, options.nodeDebugger, logger);
  });

}

const runServer = (cwd, serverPath, nodeDebugger, logger) => {
  if (!fs.existsSync(serverPath)) {
    throw new Error(`Backend doesn't exist at ${serverPath}, exiting`);
  }
  if (startBackend) {
    startBackend = false;
    //logger.debug('Starting backend');

    if (!nodeDebugOpt) {
      if (!nodeDebugger) {
        // disables node debugger when the option was set to false
        spawnServer(cwd, [serverPath], { serverPath, nodeDebugger }, logger);
      }
      // else {
      //   exec('node -v', (error, stdout, stderr) => {
      //     if (error) {
      //       spinLogger.error(error);
      //       process.exit(1);
      //     }
      //     const nodeVersion = stdout.match(/^v([0-9]+)\.([0-9]+)\.([0-9]+)/);
      //     const nodeMajor = parseInt(nodeVersion[1], 10);
      //     const nodeMinor = parseInt(nodeVersion[2], 10);
      //     nodeDebugOpt = nodeMajor >= 6 || (nodeMajor === 6 && nodeMinor >= 9) ? '--inspect' : '--debug';
      //     detectPort(9229).then(debugPort => {
      //       // Bind the port to public ip in order to allow users to access the port for debugging when using docker.
      //       const debugHost = isDocker() ? '0.0.0.0:' : '';
      //       spawnServer(
      //         cwd,
      //         [nodeDebugOpt + '=' + debugHost + debugPort, serverPath],
      //         { serverPath, nodeDebugger },
      //         logger
      //       );
      //     });
      //   });
      // }
    }
    else {
      spawnServer(cwd, [nodeDebugOpt, serverPath], { serverPath, nodeDebugger }, logger);
    }
  }
};

const startServerWebpack = () => {
  const compiler = webpack(configServer);
  // compiler.hooks.afterCompile.tap('RE_WIRED', (compilation) => {
  //   const assets = compilation.getStats().toJson()['assets'];
  //   console.log('KEYS::',assets);
  //
  // })
  // hookSync(compiler, 'compilation', compilation => {
  //       hookSync(compilation, 'after-optimize-assets', assets => {
  //         // Patch webpack-generated original source files path, by stripping hash after filename
  //         const mapKey = _.findKey(assets, (v, k) => k.endsWith('.map'));
  //         if (mapKey) {
  //           const srcMap = JSON.parse(assets[mapKey]._value);
  //           for (const idx of Object.keys(srcMap.sources)) {
  //             srcMap.sources[idx] = srcMap.sources[idx].split(';')[0];
  //           }
  //           assets[mapKey]._value = JSON.stringify(srcMap);
  //         }
  //       });
  //     });
  compiler.hooks.done.tap('Re_Wired', (err, stats) => {
    const cwd = process.cwd();
    // process.chdir(cwd);
    console.log('SERVER COMPILE IS DONE');
    const serverPath = path.join(cwd, 'build/server.js');
    const nodeDebugger = null;
    const logger = null;
    startBackend = true;
    if (server) {
      console.log('SERVER::???');
      if (!__WINDOWS__) {
        console.log('KILL SERVER SENT::');
        server.kill('SIGUSR2');
      }
    } else {
      runServer(cwd, serverPath, nodeDebugger, logger);
    }
  })
  compiler.watch({}, (err, stats) => {
    serverLogger.info(stats.toString({ colors: true }));
  });
}
const startWebpackDevServer = (reporter, resolve) => {
  const compiler = webpack(configClient);
  const WebpackDevServer = require('webpack-dev-server');
  let awaitedAlready = false;
  const onEmit = () => {

  }
  // const onEmitCallback = onEmit()
//   compiler.hooks.emit.tapAsync('StatsPlugin', (compilation, done) => {
//
//     // console.log('COMPILATION::', compilation, 'DONE',done);
//     const stats = compilation.getStats().toJson();
//
//     const outputFile = stats.outputPath;
//     const assets = JSON.stringify(stats);
//     const outputPath = path.join(outputFile, 'stats.json');
//     // console.log('outputPath', configClient);
//     // console.log('ERRR:',stats);
//
//     fs.writeFile(path.join(outputFile, 'stats.json'), assets, (err) => {
//   if (err) throw err;
//   console.log('The file has been saved!');
//   done();
// });
//     // done();
//   })
compiler.hooks.afterEmit.tapAsync('RE_WIRED', (compilation, callback) => {
    if (!awaitedAlready) {
      // if (hasBackend || builder.waitOn) {
        let waitOnUrls;
        // const backendOption = builder.backendUrl || builder.backendUrl;
        // if (backendOption) {
          // const { protocol, hostname, port } = url.parse(backendOption.replace('{ip}', ip.address()));
          // waitOnUrls = [`tcp:${hostname}:${port || (protocol === 'https:' ? 443 : 80)}`];
        // } else {
          // waitOnUrls = builder.waitOn ? [].concat(builder.waitOn) : undefined;
        // }
        // if (waitOnUrls && waitOnUrls.length) {
          clientLogger.debug(`waiting for tcp:localhost:8080`);
          const waitStart = Date.now();
          const waitNotifier = setInterval(() => {
            clientLogger.debug(`still waiting for ${waitOnOpts} after ${Date.now() - waitStart}ms...`);
          }, 10000);
          // const waitOn = builder.require('wait-on');
          resolve();
          waitOn(waitOnOpts, err => {
            clearInterval(waitNotifier);
            awaitedAlready = true;
            if (err) {
              clientLogger.error(err);
            } else {
              clientLogger.debug('Backend has been started, resuming webpack dev server...');
            }
            callback();
          });
        // }
        // else {
        //   awaitedAlready = true;
        //   callback();
        // }
      // }
      // else {
      //   callback();
      // }
    } else {
      callback();
    }
  })
  serverInstance = new WebpackDevServer(compiler, {
      ...configClient.devServer,
      reporter: (opts1, opts2) => {
        const opts = opts2 || opts1;
        const { state, stats } = opts;
        if (state) {
          clientLogger.debug('bundle is now VALID.');
        } else {
          clientLogger.debug('bundle is now INVALID.');
        }
        reporter(null, stats);
      }
    });
      clientLogger.info(configClient.devServer);
     serverInstance.listen(3000, '127.0.0.1', () => {
       clientLogger.info(`Webpack dev server listening on http://re_wired.localhost:${configClient.devServer.port}`);
    // if (platform !== 'web') {
    //   // wsProxy = webSocketProxy.attachToServer(serverInstance, '/debugger-proxy');
    //   // ms = messageSocket.attachToServer(serverInstance, '/message');
    //   // webSocketProxy.attachToServer(serverInstance, '/devtools');
    //   // if (inspectorProxy) {
    //     // inspectorProxy.attachToServer(serverInstance, '/inspector');
    //   // }
    // }
  });
}
const startClientWebpack = (resolve, reject) => {
  const reporter = (...args) => webpackReporter(...args);
  return new Promise((_resolve, reject) => {

    startWebpackDevServer(reporter, _resolve);
  }).then(() => {
    console.log('ANY RESOLVE::??');
    resolve();
  })
  .catch(err => {
    clientLogger.error(err);
  })
  // compiler.watch({}, (err, stats) => {
  //   console.log('CLIENT COMPILED::');
  //   if (err) {
  //     reject(err);
  //   }
  //
  //   resolve(stats)
  // })
  // STUF AND THINGS

}
const webpackReporter = (err, stats) => {
  console.log('ERR::', err);
  if (err) {
    // log.error(err.stack);
    throw new Error('Build error');
  }
  if (stats) {
    // const str = stats.toString(builder.config.stats);
    // if (str.length > 0) {
      clientLogger.info(stats.toString({ colors: true }));
      // log.info(str);
    // }

  //   if (builder.writeStats) {
  //     mkdirp.sync(outputPath);
  //     fs.writeFileSync(path.join(outputPath, 'stats.json'), JSON.stringify(stats.toJson(clientStats)));
  //   }
  // }
  // if (!spin.watch && cluster.isWorker) {
  //   log.info('Build process finished, exitting...');
  //   process.exit(0);
  }
};
const execute = () => {
  return new Promise((resolve, reject) => {
    startClientWebpack(resolve);

  }).then(() => {
    // clientLogger.info(stats.toString({ colors: true }));
    startServerWebpack()
  })
  .catch(err => {
    clientLogger.error(err)
  })
}
execute()
