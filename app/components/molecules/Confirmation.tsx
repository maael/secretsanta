import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import React from "react";

interface Props {
  fullScreen?: boolean;
  text: string;
  onConfirm?: (close: () => void) => void;
  disabled?: boolean;
}

interface State {
  open: boolean;
}

class ResponsiveDialog extends React.Component<Props, State> {
  public state = {
    open: false,
  };

  public render() {
    const { children, fullScreen, text } = this.props;
    return (
      <div>
        <div onClick={this.handleClickOpen}>{children}</div>
        <Dialog
          fullScreen={fullScreen}
          open={this.state.open}
          onClose={this.handleClose}
          aria-labelledby="responsive-dialog-title"
        >
          <DialogContent>{text}</DialogContent>
          <DialogActions>
            <Button onClick={this.handleClose} color="primary">
              Cancel
            </Button>
            <Button onClick={this.handleConfirm} color="primary" autoFocus>
              Confirm
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }

  public handleClose = () => {
    this.setState({ open: false });
  };

  public handleConfirm = () => {
    if (this.props.onConfirm) {
      this.props.onConfirm(this.handleClose);
    }
  };

  private handleClickOpen = () => {
    if (!this.props.disabled) {
      this.setState({ open: true });
    }
  };
}

export default ResponsiveDialog;
