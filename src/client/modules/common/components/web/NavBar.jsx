import React from 'react';
import { Link } from 'react-router-dom';
// import PropTypes from 'prop-types';

const NavBar = () => {
  return (
    <nav className="nav">
      <Link to="/">Home</Link>
      <Link to="/about">About</Link>
      <Link to="/counter">Counter</Link>
    </nav>
  );
};
NavBar.propTypes = {};
export default NavBar;
