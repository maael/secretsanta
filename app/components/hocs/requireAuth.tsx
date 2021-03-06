import { RouterProps, withRouter } from "next/router";
import React from "react";
import { AuthConsumer } from "../contexts/auth";

export default (Page: any) =>
  withRouter((props: RouterProps & any) => (
    <AuthConsumer>
      {({ loggedUser }) => {
        if (loggedUser) {
          return <Page {...props} />;
        } else {
          if ((process as any).browser) {
            window.localStorage.setItem(
              "secretsanta-redirect",
              props.router.asPath,
            );
          }
          props.router.push("/auth/sign-in");
        }
      }}
    </AuthConsumer>
  ));
