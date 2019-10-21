import { LAUNCH_TILE_DATA } from '../launches/launchesQuery';
import gql from 'graphql-tag';

export const GET_MY_TRIPS = gql`
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
