import { useQuery } from '@apollo/client';
import client from './apollo';

const useSmartQuery = (
  query,
  { variables, ...rest } = {},
  shouldRefetch = () => false,
) => {
  const data = client.readQuery({ query, variables });
  if (data && shouldRefetch(data))
    return useQuery(query, {
      variables,
      ...rest,
      fetchPolicy: 'cache-and-network',
    });
  return useQuery(query, { variables, ...rest, fetchPolicy: 'cache-first' });
};

export { useSmartQuery };
