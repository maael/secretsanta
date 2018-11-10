import Grid from "@material-ui/core/Grid";
import { createStyles, Theme, withStyles } from "@material-ui/core/styles";
import React from "react";

interface Props {
  classes: any;
}

const styles = createStyles(({ spacing }: Theme) => ({
  root: {
    padding: spacing.unit,
  },
}));

const SecretSantaFormContainer: React.SFC<Props> = ({ children, classes }) => (
  <Grid container justify="center" spacing={8} className={classes.root}>
    <Grid item xs={12} sm={10}>
      {children}
    </Grid>
  </Grid>
);

export default withStyles(styles)(SecretSantaFormContainer);
