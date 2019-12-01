import { gql, ApolloClient } from "apollo-boost";
import { useQuery, useMutation } from "@apollo/react-hooks";

const ME_QUERY = gql`
  {
    me {
      id
      name
      projects {
        id
      }
    }
  }
`;

const LOGOUT_MUTATION = gql`
  mutation logOut {
    logOut {
      message
    }
  }
`;

const LOGIN_WITH_GOOGLE_MUTATION = gql`
  mutation LoginWithGoogle($id_token: String!) {
    loginWithGoogle(id_token: $id_token) {
      id
      name
    }
  }
`;

const LOGIN_WITH_CREDENTIALS_MUTATION = gql`
  mutation loginWithCredentials($email: String!, $password: String!) {
    loginWithCredentials(email: $email, password: $password) {
      id
      name
    }
  }
`;

const LOGIN_WITH_DEMO_CREDENTIALS_MUTATION = gql`
  mutation loginWithDemoCredentials {
    loginWithDemoCredentials {
      id
      name
    }
  }
`;

const REGISTER_NEW_USER_MUTATION = gql`
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

const DELETE_ACCOUNT = gql`
  mutation deleteAccount {
    deleteAccount {
      id
      name
    }
  }
`;

const useMeQuery = (client: ApolloClient<{}>) => {
  return useQuery(ME_QUERY, {
    client,
    errorPolicy: "ignore"
  });
};

const useLoginWithGoogleMutation = () => {
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

const useLoginWithCredentialsMutation = () => {
  const [loginWithCredentials] = useMutation(LOGIN_WITH_CREDENTIALS_MUTATION);

  return (loginCredentials: LoginCredentials) => {
    return loginWithCredentials({
      variables: loginCredentials,
      refetchQueries: [{ query: ME_QUERY }]
    });
  };
};

const useLoginWithDemoCredentialsMutation = () => {
  const [loginWithDemoCredentials] = useMutation(
    LOGIN_WITH_DEMO_CREDENTIALS_MUTATION
  );
  return () =>
    loginWithDemoCredentials({
      refetchQueries: [{ query: ME_QUERY }]
    });
};

interface NewUserData extends LoginCredentials {
  name: string;
  termsAccepted: boolean;
}

const useRegisterNewUserMutation = () => {
  const [registerNewUser] = useMutation(REGISTER_NEW_USER_MUTATION);

  return (newUserData: NewUserData) => {
    return registerNewUser({
      variables: newUserData,
      refetchQueries: [{ query: ME_QUERY }]
    });
  };
};

interface HasUpdateProp {
  update: Function;
}

const useAccountDeleteMutation = () => {
  const [deleteAccount, { client }] = useMutation(DELETE_ACCOUNT);
  return ({ update }: HasUpdateProp) =>
    deleteAccount({
      awaitRefetchQueries: true,
      update: () => {
        if (client) {
          client.cache.reset();
          update();
        }
      }
    });
};

const useLogOutMutation = () => {
  const [logOut, { client }] = useMutation(LOGOUT_MUTATION);

  return ({ update }: HasUpdateProp) => {
    return logOut({
      awaitRefetchQueries: true,
      update: () => {
        if (client) {
          client.cache.reset();
        }
        update();
      }
    });
  };
};

export {
  ME_QUERY,
  LOGOUT_MUTATION,
  LOGIN_WITH_GOOGLE_MUTATION,
  LOGIN_WITH_CREDENTIALS_MUTATION,
  LOGIN_WITH_DEMO_CREDENTIALS_MUTATION,
  REGISTER_NEW_USER_MUTATION,
  DELETE_ACCOUNT,
  useMeQuery,
  useLoginWithGoogleMutation,
  useLoginWithCredentialsMutation,
  useLoginWithDemoCredentialsMutation,
  useRegisterNewUserMutation,
  useAccountDeleteMutation,
  useLogOutMutation
};
