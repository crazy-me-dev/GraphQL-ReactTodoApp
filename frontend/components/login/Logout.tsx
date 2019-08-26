import React from "react";
import { Mutation, MutationResult } from "react-apollo";
import gql from "graphql-tag";

const LOGOUT_MUTATION = gql`
  mutation LOGOUT_MUTATION {
    logOut {
      message
    }
  }
`;

interface Props {
  refetchQueries: RefetchQueries;
  children: Function;
}

const Logout = ({ refetchQueries, children }: Props) => (
  <Mutation mutation={LOGOUT_MUTATION} refetchQueries={refetchQueries}>
    {(logout: Function, { error, loading }: MutationResult) => {
      if (error) return undefined;
      if (loading) return undefined;
      return children(logout);
    }}
  </Mutation>
);

export default Logout;
export { LOGOUT_MUTATION };
