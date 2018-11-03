import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import Input from "@material-ui/core/Input";
import withMobileDialog from "@material-ui/core/withMobileDialog";
import React, { ChangeEvent } from "react";
import connect from "../../lib/connect";
import { Elf, PromiseState } from "../../types";

interface Props {
  fullScreen?: boolean;
  elf: Elf;
  secretsanta: string;
  putElf: (d: Partial<Elf>) => void;
  resetElf: () => void;
}

interface State {
  open: boolean;
  elf: Elf;
}

class ResponsiveDialog extends React.Component<Props, State> {
  public state = {
    elf: this.props.elf,
    open: false,
  };

  // public componentWillReceiveProps() {
  //   console.info("updating", this.props);
  //   this.setState({ elf: this.props.elf });
  // }

  public render() {
    const { fullScreen } = this.props;
    const { elf } = this.state;
    return (
      <div>
        <Button onClick={this.handleClickOpen}>Edit</Button>
        <Dialog
          fullScreen={fullScreen}
          open={this.state.open}
          onClose={this.handleClose}
          aria-labelledby="responsive-dialog-title"
        >
          <DialogTitle id="responsive-dialog-title">
            <Input
              placeholder="Name..."
              value={elf.name}
              onChange={this.handleElfChange}
              name="name"
              fullWidth
            />
          </DialogTitle>
          <DialogContent>
            <Input
              placeholder="Email..."
              value={elf.email}
              onChange={this.handleElfChange}
              name="email"
              fullWidth
            />
            <Input
              placeholder="Address..."
              value={elf.address}
              onChange={this.handleElfChange}
              name="address"
              fullWidth
            />
            <Input
              placeholder="Gift Hint..."
              value={elf.hints}
              onChange={this.handleElfChange}
              name="hints"
              fullWidth
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClose} color="primary">
              Cancel
            </Button>
            <Button onClick={this.handleSave} color="primary" autoFocus>
              Save
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }

  public handleClose = () => {
    this.setState({ open: false, elf: this.props.elf });
  };

  private handleElfChange = ({ target }: ChangeEvent<HTMLInputElement>) => {
    this.setState({ elf: { ...this.state.elf, [target.name]: target.value } });
  };

  private handleClickOpen = () => {
    this.setState({ open: true });
  };

  private handleSave = () => {
    this.props.putElf(this.state.elf);
    console.info("putting elf");
  };
}

export default connect(
  (props: Props) => ({
    putElf: (data: Partial<Elf>) => ({
      newElf: {
        body: JSON.stringify(data),
        method: "PUT",
        then: (_: any, meta: { component: ResponsiveDialog }) => {
          meta.component.handleClose();
        },
        url: `/api/secretsanta/${props.secretsanta}/elf/${props.elf._id}`,
      },
    }),
    // TODO: Figure out way to get wrapped component
    // }), { withRef: true })(withMobileDialog()(ResponsiveDialog as any) as any);
  }),
  { withRef: true },
)(ResponsiveDialog);
