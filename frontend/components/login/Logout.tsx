import React from "react";
import { Mutation, MutationResult } from "react-apollo";
import gql from "graphql-tag";

import { Button } from "../common";

const LOGOUT_MUTATION = gql`
  mutation LOGOUT_MUTATION {
    logOut {
      message
    }
  }
`;

interface Props {
  refetchQueries: RefetchQueries;
}

const Logout = ({ refetchQueries }: Props) => (
  <Mutation mutation={LOGOUT_MUTATION} refetchQueries={refetchQueries}>
    {(logout: Function, { error, loading }: MutationResult) => {
      if (error) return <p>{error.message}</p>;
      if (loading) return <button disabled>...</button>;
      return <Button onClick={() => logout()}>Log out</Button>;
    }}
  </Mutation>
);

export default Logout;
export { LOGOUT_MUTATION };
