import { gql, ApolloClient } from "apollo-boost";
import { useQuery, useMutation } from "@apollo/react-hooks";

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

export const LOGIN_WITH_GOOGLE_MUTATION = gql`
  mutation LoginWithGoogle($id_token: String!) {
    loginWithGoogle(id_token: $id_token) {
      id
      name
    }
  }
`;

export const LOGIN_WITH_CREDENTIALS_MUTATION = gql`
  mutation loginWithCredentials($email: String!, $password: String!) {
    loginWithCredentials(email: $email, password: $password) {
      id
      name
    }
  }
`;

export const REGISTER_NEW_USER_MUTATION = gql`
  mutation registerNewUser(
    $email: String!
    $password: String!
    $name: String!
    $termsAccepted: Boolean!
  ) {
    registerNewUser(
      email: $email
      password: $password
      name: $name
      termsAccepted: $termsAccepted
    ) {
      id
      name
    }
  }
`;

export const useMeQuery = (client: ApolloClient<{}>) => {
  return useQuery(ME_QUERY, {
    client,
    errorPolicy: "ignore"
  });
};

export const useLoginWithGoogleMutation = () => {
  const [loginWithGoogle] = useMutation<{}, { id_token: string }>(
    LOGIN_WITH_GOOGLE_MUTATION
  );

  return (id_token: string) => {
    return loginWithGoogle({
      variables: {
        id_token
      },
      refetchQueries: [{ query: ME_QUERY }]
    });
  };
};

interface LoginCredentials {
  email: string;
  password: string;
}

export const useLoginWithCredentialsMutation = () => {
  const [loginWithCredentials] = useMutation(LOGIN_WITH_CREDENTIALS_MUTATION);

  return (loginCredentials: LoginCredentials) => {
    return loginWithCredentials({
      variables: loginCredentials,
      refetchQueries: [{ query: ME_QUERY }]
    });
  };
};

interface NewUserData extends LoginCredentials {
  name: string;
  termsAccepted: boolean;
}

export const useRegisterNewUserMutation = () => {
  const [registerNewUser] = useMutation(REGISTER_NEW_USER_MUTATION);

  return (newUserData: NewUserData) => {
    return registerNewUser({
      variables: newUserData,
      refetchQueries: [{ query: ME_QUERY }]
    });
  };
};
