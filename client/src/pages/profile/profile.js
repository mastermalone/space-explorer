import React, { Fragment } from 'react';
import { Header, LaunchTile, LoadingOrError } from '../../components';

const Profile = ({ profileQuery }) => {
  const { data, loading, error } = profileQuery;

  return (
    <Fragment>
      {!loading && <Header>My Trips</Header>}
      <LoadingOrError loading={loading} error={error} />
      {data.me && data.me.trips.length ? (
        data.me.trips.map(launch => (
          <LaunchTile key={launch.id} launch={launch} />
        ))
      ) : (
        <p>You havent booked any trips</p>
      )}
    </Fragment>
  );
};

export default Profile;
