import React from 'react';
// import Home from '../modules/home/containers/Home';

// export default Home;
import '../styles/home.scss';

const imagePath = require('../../images/link.jpg');

export default () => (
  <div className="profile">
    <img src={imagePath} />
    <h1>Hello link</h1>
  </div>
);
