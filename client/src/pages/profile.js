import React, { Fragment } from 'react';
import gql from 'graphql-tag';
import { useQuery } from '@apollo/react-hooks';

import { Loading, Header, LaunchTile } from '../components';
import { LAUNCH_TILE_DATA } from './launches';

const GET_MY_TRIPS = gql`
  query GetMyTrips {
    me {
      id
      email
      trips {
        ...LaunchTileData
      }
    }
  }
  ${LAUNCH_TILE_DATA}
`;

// network only policy means that this will not come from the cached values from apollo
const Profile = () => {
  const { data, loading, error } = useQuery(GET_MY_TRIPS, {
    fetchPolicy: 'network-only',
  });

  if (Loading) {
    return <Loading />;
  }

  if (error) {
    return <p>ERROR: {error.message}</p>;
  }
  return (
    <Fragment>
      <Header>My Trips</Header>
      {data.me && data.me.trips.length ? (
        data.me.trips.map(launch => (
          <LaunchTile key={launch.id} launch={launch} />
        ))
      ) : (
        <p>You havent booke any trips</p>
      )}
    </Fragment>
  );
};

export default Profile;
