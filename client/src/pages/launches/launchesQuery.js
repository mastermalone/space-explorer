import gql from 'graphql-tag';

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

export const GET_LAUNCHES = gql`
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
