import { RouterProps, withRouter } from "next/router";
import React from "react";
import defaultPage from "../app/components/hocs/defaultPage";
import List from "../app/components/pages/List";
import { WithAuth } from "../types";

const ListPage = ({
  router,
  loggedUser,
  isAuthenticated,
}: { router: RouterProps } & WithAuth) => {
  return (
    <List
      router={router}
      loggedUser={loggedUser}
      isAuthenticated={isAuthenticated}
    />
  );
};

export default defaultPage(withRouter(ListPage));
