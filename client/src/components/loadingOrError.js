import React from 'react';

import Loading from './loading';

const LoadingOrError = ({ loading, error }) => {
  let component = <div> </div>;
  console.log('ERROR', error);
  if (loading) {
    component = <Loading />;
  }

  if (error) {
    component = <p>ERROR: {error.message}</p>;
  }

  return component;
};

export default LoadingOrError;
