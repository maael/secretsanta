import Router from "next/router";
import React from "react";
import { checkSecret, extractInfoFromHash, setToken } from "../../utils/auth";

export default class SignedIn extends React.Component<{ url: any }> {
  public componentDidMount() {
    const { token, secret } = extractInfoFromHash() as {
      token: string;
      secret: string;
    };
    if (!checkSecret(secret) || !token) {
      console.error("Something happened with the Sign In request");
    }
    setToken(token);
    Router.push("/");
  }

  public render() {
    return null;
  }
}
