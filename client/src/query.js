import { gql } from '@apollo/client';

const PROGNOSIS = gql`
  fragment Prognosis on Contract {
    prognosis(input: $input) {
      payoutPlan {
        age
        amount
      }
      simulationStatus {
        status
        message
      }
    }
  }
`;

export const QUERY = gql`
  query($input: Params) {
    contracts {
      nav {
        name
        _id
        ...Prognosis
      }
      public {
        _id
        ...Prognosis
      }
    }
  }
  ${PROGNOSIS}
`;
