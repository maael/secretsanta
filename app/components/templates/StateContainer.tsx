import React from "react";
import { IsAuthenticated, LoggedUser } from "../../../types";
import AuthManager from "../managers/Auth";

const StateContainer: React.SFC<{
  children: React.ReactChild;
  loggedUser?: LoggedUser;
  isAuthenticated: IsAuthenticated;
}> = ({ children, ...props }) => {
  return (
    <React.Fragment>
      <AuthManager
        isAuthenticated={props.isAuthenticated}
        loggedUser={props.loggedUser}
      >
        {children}
      </AuthManager>
    </React.Fragment>
  );
};

export default StateContainer;
