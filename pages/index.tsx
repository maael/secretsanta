import { RouterProps, withRouter } from "next/router";
import React from "react";
import Index from "../app/components/pages/Index";

const IndexPage = ({ router }: { router: RouterProps }) => (
  <Index router={router} />
);

export default withRouter(IndexPage);
