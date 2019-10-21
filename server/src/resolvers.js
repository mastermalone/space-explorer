/*
The first argument to our top-level resolvers, parent, 
is always blank because it refers to the root of our graph. 
The second argument refers to any arguments passed into our query, 
which we use in our launch query to fetch a launch by its id. 
Finally, we destructure our data sources from the third argument, context, 
in order to call them in our resolvers.
*/
const { paginateResults } = require('./utils');
module.exports = {
  Query: {
    launches: async (_, { pageSize = 20, after }, { dataSources }) => {
      const allLaunches = await dataSources.launchAPI.getAllLaunches();
      //We want thes is revers chronological order
      allLaunches.reverse();

      const launches = paginateResults({
        after,
        pageSize,
        results: allLaunches,
      });

      return {
        launches,
        cursor: launches.length ? launches[launches.length - 1].cursor : null,
        /**
         * If the cursor of the end of the pagination results is the same as the
         * last item in _all_ results, then there are no more results after this
         */
        hasMore: launches.length
          ? launches[launches.length - 1].cursor !==
            allLaunches[allLaunches.length - 1].cursor
          : false,
      };
    },
    launch: (_, { id }, { dataSources }) =>
      dataSources.launchAPI.getLaunchById({ launchId: id }),
    me: (_, __, { dataSources }) => dataSources.userAPI.findOrCreateUser(),
  },
  Mission: {
    missionPatch: (mission, { size } = { size: 'LARGE' }) => {
      return size === 'SMALL'
        ? mission.missionPatchSmall
        : mission.missionPatchLarge;
    },
  },
  Launch: {
    isBooked: async (launch, _, { dataSources }) =>
      dataSources.userAPI.isBookedOnLaunch({ launchId: launch.id }),
  },
  User: {
    trips: async (_, __, { dataSources }) => {
      // Get ID's of the launches by User
      const launchIds = await dataSources.userAPI.getLaunchIdsByUser();

      if (!launchIds.length) {
        return [];
      }

      // Look up those launches by their ids
      return (
        dataSources.launchAPI.getLaunchesByIds({
          launchIds,
        }) || []
      );
    },
  },
  Mutation: {
    login: async (_, { email }, { dataSources }) => {
      const user = await dataSources.userAPI.findOrCreateUser({ email });
      if (user) {
        return Buffer.from(email).toString('base64');
      }
    },
    bookTrips: async (_, { launchIds }, { dataSources }) => {
      const results = await dataSources.userAPI.bookTrips({ launchIds });
      const launches = await dataSources.launchAPI.getLaunchesByIds({
        launchIds,
      });

      return {
        success: results && results.length === launchIds.length,
        message:
          results.length === launchIds.length
            ? 'Trips booked successfully'
            : `The following luanches couldn't be booked: ${launchIds.filter(
                id => !results.includes(id)
              )}`,
        launches,
      };
    },
    cancelTrip: async (_, { launchId }, { dataSources }) => {
      const result = await dataSources.userAPI.cancelTrip({ launchId });

      if (!result) {
        return {
          success: false,
          message: 'Failed to cancel trip',
        };
      }

      const launch = await dataSources.launchAPI.getLaunchById({ launchId });

      return {
        success: true,
        message: 'Trip cancelled',
        launches: [launch],
      };
    },
  },
};

// module.exports = {
//   Query: {
//     launches: (_, __, { dataSources }) =>
//       dataSources.launchAPI.getAllLaunches(),
//     launch: (_, { id }, { dataSources }) =>
//       dataSources.launchAPI.getLaunchById({ launchId: id }),
//     me: (_, __, { dataSources }) => dataSources.userAPI.findOrCreateUser(),
//   },
// };
