import { useState, useEffect } from 'react';

import client from './config';
import { QUERY } from './queries';

const hasErrors = (data) =>
  !!data &&
  Object.values(data?.items ?? {}).some((item) => {
    return item?.computed?.calculationStatus?.status === 'ERROR';
  });

const useSmartCacheQuery = (value) => {
  const [state, set] = useState({ loading: false, error: false, data: null });
  useEffect(async () => {
    const data = client.readQuery({
      query: QUERY,
      variables: {
        input: {
          value,
        },
      },
    });

    if (data && !hasErrors(data)) {
      // cached data has no calculation errors. get cached.
      const fromCache = await client.query({
        query: QUERY,
        variables: {
          input: {
            value,
          },
        },
        fetchPolicy: 'cache-only',
      });
      return set(fromCache);
    }

    // cached data has errors. refetch...
    set({ ...state, data: null, loading: true });
    const fetched = await client.query({
      query: QUERY,
      variables: {
        input: {
          value,
        },
      },
      fetchPolicy: 'network-only',
    });
    set(fetched);
  }, [value]);
  return state;
};

export { useSmartCacheQuery };
