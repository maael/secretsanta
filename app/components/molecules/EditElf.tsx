import Badge from "@material-ui/core/Badge";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import Input from "@material-ui/core/Input";
import { createStyles, withStyles, WithStyles } from "@material-ui/core/styles";
import SettingsIcon from "@material-ui/icons/Build";
import React, { ChangeEvent } from "react";
import { Elf, PromiseState } from "../../../types";
import connect from "../../lib/connect";

interface Props {
  fullScreen?: boolean;
  elf: Elf;
  secretsanta: string;
  putElf: (d: Partial<Elf>) => void;
  displays: PromiseState<Array<{ key: string; url: string }>>;
}

interface State {
  open: boolean;
  elf: Elf;
  oldElf: Elf;
}

const styles = createStyles({
  badge: {
    bottom: 5,
    height: 0,
    right: 5,
    top: "auto",
    width: 0,
  },
});

class ResponsiveDialog extends React.Component<Props & WithStyles, State> {
  public state = {
    elf: this.props.elf,
    oldElf: this.props.elf,
    open: false,
  };

  public render() {
    const { children, classes, fullScreen } = this.props;
    const { elf } = this.state;
    const displayArea = this.renderDisplayArea();
    return (
      <div>
        <Badge
          badgeContent={<SettingsIcon />}
          color="secondary"
          classes={{ badge: classes.badge }}
          onClick={this.handleClickOpen}
        >
          {children}
        </Badge>
        <Dialog
          fullScreen={fullScreen}
          open={this.state.open}
          onClose={this.handleClose}
          aria-labelledby="responsive-dialog-title"
        >
          <DialogContent>
            {displayArea}
            <Input
              placeholder="Name..."
              value={elf.name}
              onChange={this.handleElfChange}
              name="name"
              fullWidth
            />
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
    this.setState({ open: false, elf: this.state.oldElf });
  };

  private renderDisplayArea = () => {
    const { displays } = this.props;
    const { elf } = this.state;
    const youStyle = { borderBottom: "1px dotted red", marginRight: 30 };
    if (displays.fulfilled) {
      return (
        <div>
          <img
            height={100}
            src={`/static/imgs/displays/${elf.display}.png`}
            style={youStyle}
          />
          {displays.value
            .filter(({ key }) => key !== elf.display)
            .map(({ url, key }) => (
              <img
                height={100}
                key={key}
                src={url}
                onClick={this.handleDisplayChange(key)}
              />
            ))}
        </div>
      );
    } else if (displays.pending) {
      return null;
    } else {
      return <div>Error</div>;
    }
  };

  private handleDisplayChange = (display: string) => () => {
    this.setState({ elf: { ...this.state.elf, display } });
  };

  private handleElfChange = ({ target }: ChangeEvent<HTMLInputElement>) => {
    this.setState({ elf: { ...this.state.elf, [target.name]: target.value } });
  };

  private handleClickOpen = () => {
    this.setState({ open: true });
  };

  private handleSave = () => {
    this.props.putElf(this.state.elf);
  };
}

export default (withStyles(styles)(
  connect(
    (props: Props) => ({
      displays: `/api/secretsanta/elf/displays`,
      putElf: (data: Partial<Elf>) => ({
        elf: {
          body: JSON.stringify(data),
          method: "PUT",
          then: (elf: Elf, meta: { component: ResponsiveDialog }) => {
            meta.component.handleClose();
            meta.component.setState({ elf, oldElf: elf });
          },
          url: `/api/secretsanta/${props.secretsanta}/elf/${props.elf._id}`,
        },
      }),
    }),
    { withRef: true },
  )(ResponsiveDialog),
) as unknown) as React.ComponentType<Partial<Props>>;
