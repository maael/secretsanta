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
    router.push("/list");
  }
  return <Index />;
};

export default defaultPage(withRouter(IndexPage));
