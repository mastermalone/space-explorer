import gql from 'graphql-tag';
import { LAUNCH_TILE_DATA } from '../launches/launchesQuery';

export const GET_LAUNCH_DETAILS = gql`
  query LaunchDetails($launchId: ID!) {
    launch(id: $launchId) {
      isInCart @client
      site
      rocket {
        type
      }
      ...LaunchTileData
    }
  }
  ${LAUNCH_TILE_DATA}
`;
