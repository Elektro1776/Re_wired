import React from 'react';
import PropTypes from 'prop-types';
import universal from 'react-universal-component';

const determineHowToLoad = ({ page }) => {
  console.log('PAGE:::', page);
  return typeof page !== 'string' ? () => page() : () => import(`./${page}`);
};

const Loading = () => <div>Loading:::</div>;
const UniversalComponent = universal(determineHowToLoad, {
  onError: error => {
    throw error;
  },
  minDelay: 1200,
  loading: Loading,
  // error: NotFound,
  ignoreBabelRename: true
});

UniversalComponent.propTypes = {
  loading: PropTypes.oneOfType([PropTypes.func, PropTypes.element, PropTypes.bool]),
  error: PropTypes.oneOfType([PropTypes.func, PropTypes.element, PropTypes.bool]),
  key: PropTypes.oneOfType([PropTypes.string, PropTypes.func]),
  timeout: PropTypes.number,
  onError: PropTypes.func,
  onLoad: PropTypes.func,
  minDelay: PropTypes.number,
  alwaysDelay: PropTypes.bool,
  loadingTransition: PropTypes.bool
};

export default UniversalComponent;
