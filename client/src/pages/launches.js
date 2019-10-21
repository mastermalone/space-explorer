import React, { Fragment } from 'react';
import { useQuery } from '@apollo/react-hooks';
import gql from 'graphql-tag';

import { LaunchTile, Header, Button, Loading } from '../components';
// YOU CAN USE THIS ANYWHERE THAT THIS QUERY IS NEEDED
// EVEN ON OTHER PAGES
export const LAUNCH_TILE_DATA = gql`
  fragment LaunchTileData on Launch {
    id
    isBooked
    rocket {
      id
      name
    }
    mission {
      name
      missionPatch
    }
  }
`;

const GET_LAUNCHES = gql`
  query launchList($after: String) {
    launches(after: $after) {
      cursor
      hasMore
      launches {
        ...LaunchTileData
      }
    }
  }
  ${LAUNCH_TILE_DATA}
`;

const Launches = () => {
  const { data, loading, error, fetchMore } = useQuery(GET_LAUNCHES);

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return <p>ERROR: {error.message}</p>;
  }

  return (
    <Fragment>
      <Header />
      {data.launches &&
        data.launches.launches &&
        data.launches.launches.map(launch => (
          <LaunchTile key={launch.id} launch={launch} />
        ))}
      {data.launches && data.launches.hasMore && (
        <Button
          onClick={() => {
            fetchMore({
              variables: {
                after: data.launches.cursor,
              },
              updateQuery: (prev, { fetchMoreResult, ...rest }) => {
                if (!fetchMoreResult) {
                  return prev;
                }

                return {
                  ...fetchMoreResult,
                  launches: {
                    ...fetchMoreResult.launches,
                    launches: [
                      ...prev.launches.launches,
                      ...fetchMoreResult.launches.launches,
                    ],
                  },
                };
              },
            });
          }}
        >
          Load More
        </Button>
      )}
    </Fragment>
  );
};

export default Launches;
