import React, { Fragment } from 'react';
import { Header, LaunchDetail, LoadingOrError } from './';
import { ActionButton } from '../containers';

const LaunchPage = ({ launchQuery }) => {
  const { data, loading, error } = launchQuery;

  return (
    <Fragment>
      {!loading && <Header image={data.launch.mission.missionPatch}></Header>}
      <LoadingOrError loading={loading} error={error} />
      <LaunchDetail {...data.launch} />
      <ActionButton {...data.launch} />
    </Fragment>
  );
};

export default LaunchPage;
