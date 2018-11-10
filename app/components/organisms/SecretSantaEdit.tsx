import Button from "@material-ui/core/Button";
import Drawer from "@material-ui/core/Drawer";
import React from "react";
import { SecretSanta } from "../../../types";
import connect from "../../lib/connect";
import SecretSantaForm from "./SecretSantaForm";

interface Props {
  secretSanta: SecretSanta;
  put: (d: Partial<SecretSanta>) => void;
}

class SecretSantaEdit extends React.Component<Props> {
  public state = {
    open: false,
  };

  public render() {
    const { secretSanta } = this.props;
    const { open } = this.state;
    return (
      <React.Fragment>
        <Button onClick={this.handleChange(true)}>Edit</Button>
        <Drawer anchor="bottom" open={open} onClose={this.handleChange(false)}>
          <SecretSantaForm
            secretSanta={secretSanta}
            onSubmit={this.handleSubmit}
          />
        </Drawer>
      </React.Fragment>
    );
  }

  private handleChange = (open: boolean) => () => {
    this.setState({ open });
  };

  private handleSubmit = (data: Partial<SecretSanta>) => {
    this.props.put(data);
    this.handleChange(false)();
  };
}

export default connect(
  (props: Props) => ({
    put: (data: Partial<SecretSanta>) => ({
      secret: {
        body: JSON.stringify(data),
        method: "PUT",
        url: `/api/secretsanta/${props.secretSanta._id}`,
      },
    }),
  }),
  { withRef: true },
)(SecretSantaEdit);
