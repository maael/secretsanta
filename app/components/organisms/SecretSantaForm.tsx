import Button from "@material-ui/core/Button";
import Paper from "@material-ui/core/Paper";
import { createStyles, Theme, withStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import React, { ChangeEvent, FormEvent, MouseEvent } from "react";
import { SecretSanta } from "../../../types";

export interface State {
  budget: string;
  deadlineDate: string;
  name: string;
  revealDate: string;
}

interface Props {
  classes: any;
  secretSanta?: Partial<SecretSanta>;
  onChange?: (s: State) => void;
  onSubmit?: (s: State) => void;
}

const styles = createStyles(({ spacing }: Theme) => ({
  button: {
    marginTop: 10,
  },
  paper: {
    padding: spacing.unit,
  },
}));

const formatDateTimeToDate = (str: string) => {
  const d = new Date(str);
  return `${d.getFullYear()}-${`0${d.getMonth() + 1}`.slice(
    -2,
  )}-${`0${d.getDate()}`.slice(-2)}`;
};

class SecretSantaForm extends React.Component<Props> {
  public state = {
    budget: (this.props.secretSanta && this.props.secretSanta.budget) || "0",
    deadlineDate:
      (this.props.secretSanta && this.props.secretSanta.deadlineDate) ||
      `${new Date().getFullYear()}-12-01`,
    name: (this.props.secretSanta && this.props.secretSanta.name) || "",
    revealDate:
      (this.props.secretSanta && this.props.secretSanta.revealDate) ||
      `${new Date().getFullYear()}-12-24`,
  };

  public render() {
    const { classes } = this.props;
    const { name, budget, revealDate, deadlineDate } = this.state;
    return (
      <form onSubmit={this.onSubmit}>
        <Paper className={classes.paper}>
          <TextField
            id="name"
            label="Name"
            value={name}
            onChange={this.handleChange}
            name="name"
            fullWidth
          />
          <TextField
            id="budget"
            label="Budget"
            type="string"
            value={budget}
            onChange={this.handleChange}
            name="budget"
            fullWidth
          />
          <TextField
            id="deadline"
            label="Deadline Date"
            type="date"
            value={formatDateTimeToDate(deadlineDate)}
            fullWidth
            InputLabelProps={{
              shrink: true,
            }}
            name="deadlineDate"
            onChange={this.handleChange}
          />
          <TextField
            id="reveal"
            label="Reveal Date"
            type="date"
            value={formatDateTimeToDate(revealDate)}
            fullWidth
            InputLabelProps={{
              shrink: true,
            }}
            name="revealDate"
            onChange={this.handleChange}
          />
        </Paper>
        <Button
          className={classes.button}
          type="submit"
          variant="contained"
          fullWidth
          onClick={this.onSubmit}
          color="secondary"
        >
          Submit
        </Button>
      </form>
    );
  }

  private onSubmit = (
    e: MouseEvent<HTMLElement> | FormEvent<HTMLFormElement>,
  ) => {
    e.preventDefault();
    if (this.props.onSubmit) {
      this.props.onSubmit(this.state);
    }
  };

  private handleChange = ({
    target,
  }: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    this.setState({ [target.name]: target.value }, () => {
      if (this.props.onChange) {
        this.props.onChange(this.state);
      }
    });
  };
}

export default withStyles(styles)(SecretSantaForm);
