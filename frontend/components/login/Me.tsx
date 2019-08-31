import React from "react";
import { Query, QueryResult } from "react-apollo";
import gql from "graphql-tag";
import { useQuery } from "@apollo/react-hooks";

const ME_QUERY = gql`
  query ME_QUERY {
    me {
      id
      name
      email
      projects {
        id
        name
        tasks {
          id
          description
        }
      }
    }
  }
`;

interface Props {
  children: Function;
}

const Me = (props: Props) => {
  const payload = useQuery(ME_QUERY);
  return props.children(payload);
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
  projects: Project[];
}
export interface IMeQueryResult extends QueryResult {
  data: {
    me: IMe;
  };
}
export default Me;
export { ME_QUERY };
