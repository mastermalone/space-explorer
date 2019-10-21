import React, { Fragment } from 'react';
import { useQuery } from '@apollo/react-hooks';
import gql from 'graphql-tag';
import {
  Loading,
  Header,
  LaunchDetail,
  LoadingOrError,
} from '../../components';
import { ActionButton } from '../../containers';

const Launch = ({ launchQuery }) => {
  const { data, loading, error } = launchQuery;

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return <p>ERROR: {error.message}</p>;
  }
  return (
    <Fragment>
      {!loading && <Header image={data.launch.mission.missionPatch}></Header>}
      <LoadingOrError loading={loading} error={error} />
      <LaunchDetail {...data.launch} />
      <ActionButton {...data.launch} />
    </Fragment>
  );
};

export default Launch;
