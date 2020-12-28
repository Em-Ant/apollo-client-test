import { gql } from '@apollo/client';

const COMPUTED = gql`
  fragment Computed on BaseItem {
    computed(input: $input) {
      result {
        x
        y
      }
      calculationStatus {
        status
        message
      }
    }
  }
`;

export const QUERY = gql`
  query($input: Params) {
    items {
      typeA {
        name
        idField
        ...Computed
      }
      typeB {
        name
        idField
        ...Computed
      }
    }
  }
  ${COMPUTED}
`;
