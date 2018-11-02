import { RouterProps, withRouter } from "next/router";
import React from "react";
import View from "../../app/components/pages/secret/View";

const RoomPage = ({ router }: { router: RouterProps }) => (
  <View router={router} />
);

export default withRouter(RoomPage);
