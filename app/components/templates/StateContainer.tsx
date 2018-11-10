import React from "react";

const StateContainer: React.SFC<{
  children: React.ReactChild;
}> = ({ children, ...props }) => {
  console.info("PROPS", props);
  return <React.Fragment>{children}</React.Fragment>;
};

export default StateContainer;
