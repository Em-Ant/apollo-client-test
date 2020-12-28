import { useState, useEffect } from 'react';

import client from './config';
import { QUERY } from './queries';

const itemHasError = (item) =>
  !item || item?.computed?.calculationStatus?.status === 'ERROR';

const hasErrors = (data) =>
  !!data &&
  (!data.items ||
    Object.values(data?.items ?? {}).some((_data) => {
      if (_data === null) return true;
      if (Array.isArray(_data)) return _data.some(itemHasError);
      else return itemHasError(_data);
    }));

/**
 * Refetches if the item contains errors
 * or it is invalid (null) due to graphql error.
 * It returns cached valid data otherwise.
 * (just to test if it's possible...)
 **/
const useSmartCacheQuery = (value) => {
  const [state, set] = useState({ loading: false, data: null });
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
        errorPolicy: 'all',
      });
      return set(fromCache);
    }

    // cached data has errors. refetch...
    set({ ...state, data: null, loading: true, errors: null, error: null });
    const fetched = await client.query({
      query: QUERY,
      variables: {
        input: {
          value,
        },
      },
      fetchPolicy: 'network-only',
      errorPolicy: 'all',
    });
    set(fetched);
  }, [value]);
  return state;
};

export { useSmartCacheQuery };
