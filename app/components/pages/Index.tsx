import Button from "@material-ui/core/Button";
import {
  createStyles,
  Theme,
  withStyles,
  WithStyles,
} from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Link from "next/link";
import React from "react";
import SpaceDebris from "../atoms/SpaceDebris";

const styles = createStyles((theme: Theme) => ({
  container: {
    bottom: 0,
    left: 0,
    position: "absolute",
    top: 50,
    width: "100vw",
    zIndex: -1,
  },
  img: {
    width: "100%",
  },
  list: {
    color: "#FFFFFF",
    listStyleType: "none",
    padding: theme.spacing.unit,
  },
  listItem: {
    padding: theme.spacing.unit / 2,
  },
  section: {
    padding: theme.spacing.unit,
  },
  text: {
    color: "#FFFFFF",
  },
}));

export default withStyles(styles)(({ classes }: WithStyles) => (
  <div style={{ textAlign: "center" }}>
    <section className={classes.section}>
      <Typography className={classes.text} variant="h2">
        What?
      </Typography>
    </section>
    <section className={classes.section}>
      <Typography className={classes.text} variant="body1">
        Secret santas!
      </Typography>
      <Typography className={classes.text} variant="body1">
        They're fun, and exciting, but organising them's a pain
      </Typography>
      <Typography className={classes.text} variant="body1">
        And most of the time the person organising it knows who's got who
      </Typography>
      <Typography className={classes.text} variant="body1">
        That's no fun
      </Typography>
    </section>
    <section className={classes.section}>
      <Typography className={classes.text} variant="h4">
        Introducing
      </Typography>
      <Typography className={classes.text} variant="h5">
        <img src="/static/imgs/stars.png" height={20} /> secretsanta.space{" "}
        <img src="/static/imgs/stars.png" height={20} />
      </Typography>
    </section>
    <section className={classes.section}>
      <Typography className={classes.text} variant="body1">
        Make your secret santa, setting things like:
      </Typography>
      <ul className={classes.list}>
        <li className={classes.listItem}>Budget</li>
        <li className={classes.listItem}>
          A closing date for people to join and to match people up
        </li>
        <li className={classes.listItem}>A reveal date to see who got who</li>
      </ul>
      <Typography className={classes.text} variant="body1">
        Share the link to your secret santa to let people join up!
      </Typography>
      <Typography className={classes.text} variant="body1">
        Everyone can set things like addresses and gift hints, which will be
        given to whoever they get matched with!
      </Typography>
      <Typography className={classes.text} variant="body1">
        Sit back and wait for your email telling you who you need to buy for!
      </Typography>
    </section>
    <section className={classes.section}>
      <Link href="/auth/sign-in">
        <Button variant="contained" color="secondary">
          Login and join the festivities
        </Button>
      </Link>
    </section>
    <div id="container" className={classes.container}>
      <SpaceDebris>
        <img src="/static/imgs/santa.png" className={classes.img} />
      </SpaceDebris>
      <SpaceDebris>
        <img src="/static/imgs/reindeer.png" className={classes.img} />
      </SpaceDebris>
      <SpaceDebris>
        <img src="/static/imgs/pengiun.png" className={classes.img} />
      </SpaceDebris>
      <SpaceDebris>
        <img src="/static/imgs/snowman.png" className={classes.img} />
      </SpaceDebris>
      <SpaceDebris>
        <img src="/static/imgs/spaceship.png" className={classes.img} />
      </SpaceDebris>
    </div>
  </div>
));
