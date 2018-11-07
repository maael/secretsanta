import { RouterProps, withRouter } from "next/router";
import React from "react";
import defaultPage from "../app/components/hocs/defaultPage";
import Index from "../app/components/pages/Index";
import { WithAuth } from "../types";

const IndexPage = ({
  router,
  loggedUser,
  isAuthenticated,
}: { router: RouterProps } & WithAuth) => {
  return (
    <Index
      router={router}
      loggedUser={loggedUser}
      isAuthenticated={isAuthenticated}
    />
  );
};

export default defaultPage(withRouter(IndexPage));
