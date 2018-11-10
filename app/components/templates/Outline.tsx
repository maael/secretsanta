import AppBar from "@material-ui/core/AppBar";
import { createStyles, withStyles, WithStyles } from "@material-ui/core/styles";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Link from "next/link";
import React, { ReactChild } from "react";
import NoSSR from "react-no-ssr";
import AuthHeader from "../atoms/AuthHeader";
const SnowStorm = require("react-snowstorm");

const styles = createStyles({
  item: {
    cursor: "pointer",
    flexGrow: 1,
    marginRight: 15,
  },
  root: {
    flexGrow: 1,
  },
});

const Outline: React.SFC<{ children: ReactChild } & WithStyles> = ({
  children,
  classes,
}) => (
  <div className={classes.root}>
    <AppBar position="static">
      <Toolbar variant="dense">
        <Link href="/">
          <Typography variant="h5" color="inherit" className={classes.item}>
            Secret Santa in Space
          </Typography>
        </Link>
        <AuthHeader />
      </Toolbar>
    </AppBar>
    <NoSSR>
      <SnowStorm />
    </NoSSR>
    <div>{children}</div>
  </div>
);

export default withStyles(styles)(Outline);
