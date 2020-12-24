import { ApolloClient, InMemoryCache } from '@apollo/client';

const client = new ApolloClient({
  uri: 'api/graphql',
  cache: new InMemoryCache({
    typePolicies: {
      Items: {
        keyFields: false,
        merge: (existing, incoming) => {
          // avoid null refernces in case of graphql error and incomplete response
          const out = { ...existing, ...incoming };
          Object.keys(out).forEach((k) => {
            out[k] =
              (incoming && incoming[k]) ?? (existing && existing[k]) ?? null;
          });
          return out;
        },
      },
      Item: {
        keyFields: ['idField'],
      },
      Computed: {
        merge: (existing, incoming) => {
          if (!existing) return incoming;
          // avoid caching items that have calculation error
          return incoming?.calculationStatus?.status === 'ERROR'
            ? existing
            : incoming;
        },
      },
    },
  }),
});

export default client;
