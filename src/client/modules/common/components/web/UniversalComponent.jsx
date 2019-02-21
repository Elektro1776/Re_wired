import React from 'react';
import universal from 'react-universal-component';

const Loading = () => <div>Loading:::</div>;
const UniversalComponent = universal(props => import(`../../../${props.page}`), {
  loading: Loading
});

export default UniversalComponent;
