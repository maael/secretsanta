import { RouterProps, withRouter } from "next/router";
import React from "react";
import defaultPage from "../app/components/hocs/defaultPage";
import Index from "../app/components/pages/Index";
import { WithAuth } from "../types";

const IndexPage = ({
  router,
  isAuthenticated,
}: { router: RouterProps } & WithAuth) => {
  if (isAuthenticated) {
    if ((process as any).browser) {
      const redirect = window.localStorage.getItem("secretsanta-redirect");
      window.localStorage.removeItem("secretsanta-redirect");
      if (redirect) {
        router.push(redirect);
        return null;
      } else {
        router.push("/list");
        return null;
      }
    } else {
      router.push("/list");
      return null;
    }
  }
  return <Index />;
};

export default defaultPage(withRouter(IndexPage));
