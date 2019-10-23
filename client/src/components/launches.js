import React, { Fragment } from 'react';

import { LaunchTile, Header, Button, LoadingOrError } from './';

const Launches = ({ data, loading, error, fetchMore }) => (
  <Fragment>
    {loading === false && <Header />}
    <LoadingOrError loading={loading} error={error} />
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

export default Launches;
