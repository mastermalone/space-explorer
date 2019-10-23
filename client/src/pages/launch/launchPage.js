import React, { Fragment } from 'react';
import Launch from '../../components/launch';

const LaunchPage = ({ launchQuery }) => {
  const { data, loading, error } = launchQuery;

  return (
    <Fragment>
      <div className='container'>
        <Launch loading={loading} error={error} />
      </div>
    </Fragment>
  );
};

export default LaunchPage;
