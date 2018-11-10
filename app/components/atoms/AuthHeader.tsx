import {
  createStyles,
  Theme,
  withStyles,
  WithStyles,
} from "@material-ui/core/styles";
import Link from "next/link";
import React from "react";
import { AuthConsumer } from "../contexts/auth";

const styles = createStyles((theme: Theme) => ({
  link: {
    cursor: "pointer",
    padding: theme.spacing.unit,
  },
}));

export default withStyles(styles)(({ classes }: WithStyles) => (
  <AuthConsumer>
    {({ loggedUser }) =>
      loggedUser ? (
        <React.Fragment>
          <Link href="/">
            <span className={classes.link}>{loggedUser.nickname}</span>
          </Link>
          <Link href="/auth/sign-out">
            <span className={classes.link}>Log out</span>
          </Link>
        </React.Fragment>
      ) : (
        <Link href="/auth/sign-in">
          <span className={classes.link}>Log in</span>
        </Link>
      )
    }
  </AuthConsumer>
));
