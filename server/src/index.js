const { ApolloServer } = require('apollo-server');
const typeDefs = require('./schema');
const store = require('./store');
const resolvers = require('./resolvers');

const LaunchAPI = require('./datasources/launch');
const UserAPI = require('./datasources/user');
const AuthenticateUser = require('./service/authentication');

const server = new ApolloServer({
  context: AuthenticateUser,
  typeDefs,
  resolvers,
  dataSources: () => ({
    launchAPI: new LaunchAPI(),
    userAPI: new UserAPI({ store }),
  }),
});

server.listen().then(({ url }) => {
  console.log(` Server is ready at ${url}`);
});
