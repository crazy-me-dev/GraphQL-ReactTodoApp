import React from "react";
import { useSpring, animated } from "react-spring";

const ListTransition: React.FC = props => {
  const styleProps = useSpring({
    from: { opacity: 0, transform: "translateX(1rem)" },
    to: { opacity: 1, transform: "translateX(0)" }
  });

  return <animated.div style={styleProps}>{props.children}</animated.div>;
};

export default ListTransition;
