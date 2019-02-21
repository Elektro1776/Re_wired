import React from 'react';
import PropTypes from 'prop-types';
import NavBar from './NavBar';

const PageLayout = ({ children }) => {
  return (
    <div className="main">
      <NavBar />
      {children}
    </div>
  );
};
PageLayout.propTypes = {
  children: PropTypes.node
};
export default PageLayout;
