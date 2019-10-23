import React, { Fragment } from 'react';

import { Launches } from '../../components';

const LaunchesPage = ({
  launchesQuery,
  launchesQueryParams,
  launchesQuery2,
  launchesQuery2Params,
}) => {
  const launchData = launchesQuery(launchesQueryParams);
  const launchData2 = launchesQuery2(launchesQuery2Params);
  console.log(launchData);
  return (
    <Fragment>
      <Launches {...launchData2} />
    </Fragment>
  );
};

export default LaunchesPage;
