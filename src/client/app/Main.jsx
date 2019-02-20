import React from 'react';
import ReactDOM from 'react-dom';
import AppRoot from '../components/AppRoot.jsx';

function render(Component) {
  ReactDOM.hydrate(
    <Component />,
    document.getElementById('react-root')
  )
}

render(AppRoot)
