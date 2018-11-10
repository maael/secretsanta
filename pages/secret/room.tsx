import { RouterProps, withRouter } from "next/router";
import React from "react";
import defaultPage from "../../app/components/hocs/defaultPage";
import View from "../../app/components/pages/secret/View";
import { WithAuth } from "../../types";

const RoomPage = ({
  router,
  loggedUser,
  isAuthenticated,
}: { router: RouterProps } & WithAuth) => {
  return (
    <View
      router={router}
      loggedUser={loggedUser}
      isAuthenticated={isAuthenticated}
    />
  );
};

export default defaultPage(withRouter(RoomPage));
