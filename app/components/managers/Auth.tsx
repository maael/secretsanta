import React from "react";
import { IsAuthenticated, LoggedUser } from "../../../types";
import { AuthProvider } from "../contexts/auth";

interface Props {
  isAuthenticated: IsAuthenticated;
  loggedUser?: LoggedUser;
}

interface State {
  isAuthenticated: IsAuthenticated;
  loggedUser?: LoggedUser;
}

export default class AuthManager extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      isAuthenticated: props.isAuthenticated,
      loggedUser: props.loggedUser,
    };
  }

  public render() {
    return (
      <AuthProvider value={this.state}>{this.props.children}</AuthProvider>
    );
  }
}
