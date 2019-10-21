import { ApolloClient } from 'apollo-client';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { HttpLink } from 'apollo-link-http';
import { ApolloProvider, useQuery } from '@apollo/react-hooks';
import React from 'react';
import ReactDom from 'react-dom';
import Pages from './pages';
import Login from './pages/login/loginContainer';
// import Login from './pages/login';
import injectStyles from './styles';
import { typeDefs, resolvers } from './resolvers';
import gql from 'graphql-tag';

const cache = new InMemoryCache();
const link = new HttpLink({
  uri: 'http://localhost:4000/',
  headers: {
    authorization: localStorage.getItem('token'),
  },
  typeDefs,
  resolvers,
});

const client = new ApolloClient({
  cache,
  link,
});

cache.writeData({
  data: {
    isLoggedin: !!localStorage.getItem('token'),
    cartItems: [],
  },
});

const IS_LOGGED_IN = gql`
  query IsUserLoggedIn {
    isLoggedin @client
  }
`;

const IsLoggedIn = () => {
  const { data } = useQuery(IS_LOGGED_IN);
  return data.isLoggedin ? <Pages /> : <Login />;
};

injectStyles();
ReactDom.render(
  <ApolloProvider client={client}>
    <IsLoggedIn />
  </ApolloProvider>,
  document.getElementById('root')
);
