import { ApolloClient, InMemoryCache } from '@apollo/client';

const client = new ApolloClient({
  uri: 'api/graphql',
  cache: new InMemoryCache({
    typePolicies: {
      Item: {
        keyFields: ['idField'],
      },
    },
  }),
});

export default client;
