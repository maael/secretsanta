import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import React from "react";
import { LoggedUser, PromiseState, SecretSanta } from "../../../types";
import connect from "../../lib/connect";

interface Props {
  secrets: PromiseState<SecretSanta[]>;
  type: "created" | "participating";
  loggedUser: LoggedUser;
}

class Page extends React.Component<Props> {
  public render() {
    const { secrets, type } = this.props;
    if (secrets.fulfilled) {
      return (
        <React.Fragment>
          <Typography variant="h6">
            {type === "created" ? "Created" : "Participating"}
          </Typography>
          {secrets.value.map(secret => (
            <a key={secret._id} href={`/secret/${secret._id}`}>
              <Paper style={{ padding: 10, margin: 10 }}>
                <Typography variant="h6">{secret.name}</Typography>
                <Typography variant="subtitle1">
                  {secret.elfs.map(({ name }) => name).join(",")}
                </Typography>
                <Typography variant="subtitle1">
                  Closing: {secret.deadlineDate}
                </Typography>
                <Typography variant="subtitle1">
                  Revealing: {secret.revealDate}
                </Typography>
              </Paper>
            </a>
          ))}
        </React.Fragment>
      );
    } else if (secrets.pending) {
      return <div>Loading</div>;
    } else {
      return <div>Error</div>;
    }
  }
}

export default connect((props: Props) => ({
  secrets: `/api/secretsanta/${props.type === "created" ? "santa" : "elf"}/${
    props.loggedUser.sub
  }`,
}))(Page);
