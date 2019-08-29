import React from "react";
import { Query, QueryResult } from "react-apollo";
import gql from "graphql-tag";

const ME_QUERY = gql`
  query ME_QUERY {
    me {
      id
      name
      email
      projects {
        id
        name
      }
    }
  }
`;

interface Props {
  children: Function;
}

const Me = (props: Props) => {
  return (
    <Query {...props} query={ME_QUERY}>
      {(payload: IMeQueryResult) => {
        return props.children(payload);
      }}
    </Query>
  );
};

export interface IMe {
  id: "string";
  name: "string";
  email: "string";
}
export interface IMeQueryResult extends QueryResult {
  data: {
    me: IMe;
  };
}
export default Me;
export { ME_QUERY };
