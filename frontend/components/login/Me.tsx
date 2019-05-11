import React from "react";
import { Query } from "react-apollo";
import gql from "graphql-tag";

const ME_QUERY = gql`
  query ME_QUERY {
    me {
      id
      name
      email
    }
  }
`;

const Me = props => {
  return (
    <Query {...props} query={ME_QUERY}>
      {payload => {
        return props.children(payload);
      }}
    </Query>
  );
};

export default Me;
export { ME_QUERY };
