import Router from "next/router";
import Me, { IMeQueryResult } from "./Me";

interface Props {
  to: string;
  children: any;
}

const RedictAfterUnauth = (props: Props) => {
  const redirect = () => {
    if (Router.router) {
      Router.push(props.to);
    }
  };

  return (
    <Me>
      {({ data, error }: IMeQueryResult) => {
        if (error || !data.me) {
          redirect();
        }
        return props.children;
      }}
    </Me>
  );
};

export default RedictAfterUnauth;
