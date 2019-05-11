import Router from "next/router";
import Me from "./Me";

interface Props {
  to: String;
  router: Object;
  children: any;
}

const RedictAfterAuth = (props: Props) => {
  const redirect = () => {
    if (Router.router) {
      Router.push(props.to);
    }
  };

  return (
    <Me>
      {({ data, error }) => {
        console.log(data);
        if (!error && data && data.me) {
          redirect();
        }
        return props.children;
      }}
    </Me>
  );
};

export default RedictAfterAuth;
