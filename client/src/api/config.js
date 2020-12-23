import { ApolloClient, InMemoryCache } from '@apollo/client';

const client = new ApolloClient({
  uri: 'api/graphql',
  cache: new InMemoryCache({
    typePolicies: {
      Item: {
        keyFields: ['idField'],
      },
      Computed: {
        merge: (existing, incoming) => {
          if (!existing) return incoming;
          // avoid caching items that have caclulation error
          return incoming?.calculationStatus?.status === 'ERROR'
            ? existing
            : incoming;
        },
      },
    },
  }),
});

export default client;
