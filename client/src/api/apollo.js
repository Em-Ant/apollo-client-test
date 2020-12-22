import { ApolloClient, InMemoryCache } from '@apollo/client';

const client = new ApolloClient({
  uri: 'api/graphql',
  cache: new InMemoryCache({
    typePolicies: {
      Contract: {
        keyFields: ['custId'],
      },
    },
  }),
});

export default client;