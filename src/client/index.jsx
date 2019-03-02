import React from 'react';
import ReactDOM from 'react-dom';
import Main from './app/Main';

function renderApp() {
  ReactDOM.hydrate(<Main />, document.getElementById('react-root'));
}

renderApp();

console.log('Should be DEV::', __DEV__);
// if (__DEV__) {
//   if (module.hot) {
//     console.log('MODULE IS HOT HERE ACCEPT');
//     module.hot.accept();
//
//     // module.hot.accept('backend_reload', () => {
//     //   log.debug('Reloading front-end');
//     //   window.location.reload();
//     // });
//
//     module.hot.accept('./app/Main', () => {
//       console.log('HOT ACCEPTED:::');
//       try {
//         // log.debug('Updating front-end');
//         // frontendReloadCount = (frontendReloadCount || 0) + 1;
//
//         renderApp();
//         console.log('RENDER APP FIRE::');
//       } catch (err) {
//         console.log('ERRR:', err);
//         // log(err.stack);
//       }
//     });
//   }
// }
