import { gql, ApolloClient } from "apollo-boost";
import { useQuery } from "@apollo/react-hooks";

export const ME_QUERY = gql`
  {
    me {
      id
      name
    }
  }
`;

export const LOGOUT_MUTATION = gql`
  mutation logOut {
    logOut {
      message
    }
  }
`;

export const useMeQuery = (client: ApolloClient<{}>) => {
  return useQuery(ME_QUERY, {
    client,
    errorPolicy: "ignore"
  });
};
