import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import Link from "next/link";
import React from "react";
import { LoggedUser, PromiseState, SecretSanta } from "../../../types";
import connect from "../../lib/connect";
import { formatDate } from "../../lib/utils";

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
            {type === "created"
              ? "Created Secret Santas"
              : "Participating Secret Santas"}
          </Typography>
          {secrets.value.map(secret => (
            <Link key={secret._id} href={`/secret/${secret._id}`}>
              <Paper style={{ padding: 10, margin: 10 }}>
                <Typography style={{ display: "inline-block" }} variant="h6">
                  {secret.name}
                </Typography>
                <Typography
                  style={{ display: "inline-block", padding: "0 10px" }}
                  variant="subtitle1"
                >
                  Closing: {formatDate(secret.deadlineDate)}
                </Typography>
                <Typography
                  style={{ display: "inline-block", padding: "0 10px" }}
                  variant="subtitle1"
                >
                  Revealing: {formatDate(secret.revealDate)}
                </Typography>
                <Typography variant="subtitle1">
                  {secret.elfs.map(({ name }) => name).join(", ")}
                </Typography>
              </Paper>
            </Link>
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
