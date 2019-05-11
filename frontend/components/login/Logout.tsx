import React from "react";
import { Mutation } from "react-apollo";
import gql from "graphql-tag";

import { Button } from "../common";

const LOGOUT_MUTATION = gql`
  mutation LOGOUT_MUTATION {
    logOut {
      message
    }
  }
`;

const Logout = ({ refetchQueries }) => (
  <Mutation mutation={LOGOUT_MUTATION} refetchQueries={refetchQueries}>
    {(logout, { error, loading }) => {
      if (error) return <p>{error.message}</p>;
      if (loading) return <button disabled>...</button>;
      return <Button onClick={logout}>Log out</Button>;
    }}
  </Mutation>
);

export default Logout;
export { LOGOUT_MUTATION };
