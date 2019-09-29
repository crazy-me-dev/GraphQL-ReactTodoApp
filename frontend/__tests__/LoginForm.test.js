import { shallow, mount } from "enzyme";
import { MockedProvider } from "react-apollo/test-utils";
import { ApolloConsumer } from "react-apollo";
import wait from "waait";
import Router from "next/router";

import { ME_QUERY } from "../components/login/Me";
import LoginForm from "../components/login/LoginForm";

Router.router = {
  push: jest.fn(),
  prefetch: jest.fn()
};

const fakeUser = {
  __typename: "User",
  id: "123",
  name: "Jean Sibelius",
  email: "jean.sibelius@example.app"
};

const notSignedInMocks = [
  {
    request: { query: ME_QUERY },
    result: { data: { me: null } }
  }
];

const signedInMocks = [
  {
    request: { query: ME_QUERY },
    result: { data: { me: fakeUser } }
  }
];

describe("<LoginForm />", () => {
  it("should test", async () => {
    return true;
  });
  // it("should show login form", async () => {
  //   const wrapper = mount(
  //     <MockedProvider mocks={notSignedInMocks}>
  //       <LoginForm />
  //     </MockedProvider>
  //   );
  //   await wait(0);
  //   expect(wrapper.text()).toContain("Log in with Google Account");
  // });
  // it("redirects after user have logged in", async () => {
  //   let apolloClient;
  //   const wrapper = mount(
  //     <MockedProvider mocks={signedInMocks}>
  //       <ApolloConsumer>
  //         {client => {
  //           apolloClient = client;
  //           return <LoginForm />;
  //         }}
  //       </ApolloConsumer>
  //     </MockedProvider>
  //   );
  //   await wait(0);
  //   wrapper.update();
  //   expect(Router.router.push).toHaveBeenCalledWith("/dashboard");
  // });
});
