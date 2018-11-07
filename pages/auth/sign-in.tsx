import React from "react";
import defaultPage from "../../app/components/hocs/defaultPage";
import { show } from "../../utils/lock";

const CONTAINER_ID = "lock-container";

class SignIn extends React.Component {
  public componentDidMount() {
    show(CONTAINER_ID);
  }

  public render() {
    return <div id={CONTAINER_ID} />;
  }
}

export default defaultPage(SignIn);
