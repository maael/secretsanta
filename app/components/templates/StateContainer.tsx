import React from "react";

const StateContainer: React.SFC<{
  children: React.ReactChild;
}> = ({ children }) => <React.Fragment>{children}</React.Fragment>;

export default StateContainer;
