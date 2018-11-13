import Avatar from "@material-ui/core/Avatar";
import Chip from "@material-ui/core/Chip";
import Paper from "@material-ui/core/Paper";
import {
  createStyles,
  Theme,
  withStyles,
  WithStyles,
} from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import CalendarIcon from "@material-ui/icons/CalendarToday";
import { RouterProps } from "next/router";
import React from "react";
import { Elf, LoggedUser, PromiseState, SecretSanta } from "../../../../types";
import connect from "../../../lib/connect";
import EditElf from "../../molecules/EditElf";
import SecretSantaEdit from "../../organisms/SecretSantaEdit";
import SecretSantaMatches from "../../organisms/SecretSantaMatches";

interface Props {
  secret: PromiseState<SecretSanta>;
  elf?: PromiseState<Elf>;
  postElf: (d: Partial<Elf>) => PromiseState<Elf>;
  getElf: (id: string) => PromiseState<Elf>;
  getSecret: () => PromiseState<SecretSanta>;
  router: RouterProps;
  loggedUser: LoggedUser;
}

interface State {
  editable?: boolean;
  joinable?: boolean;
  loaded: boolean;
}

const formatDate = (dateStr: string) => {
  const d = new Date(dateStr);
  return `${`0${d.getDate()}`.slice(-2)}/${`0${d.getMonth() + 1}`.slice(
    -2,
  )}/${d.getFullYear()}`;
};

const styles = createStyles((theme: Theme) => ({
  chip: {
    marginLeft: theme.spacing.unit,
  },
  elf: {
    float: "left",
  },
  link: {
    color: "inherit",
    textDecoration: "none",
  },
  paper: {
    margin: 10,
    padding: 10,
  },
  topInfo: {
    margin: 10,
    padding: 10,
    textAlign: "center",
  },
}));

class Page extends React.Component<Props & WithStyles, State> {
  public state = {
    editable: undefined,
    joinable: undefined,
    loaded: false,
  };

  public componentDidUpdate() {
    const { router, loggedUser, secret } = this.props;
    const id = router && router.query && router.query.id;
    const { loaded } = this.state;
    if (!loaded && secret.value) {
      const joinable =
        secret.value && new Date(secret.value.deadlineDate) > new Date();
      const editable =
        secret.value && new Date(secret.value.revealDate) > new Date();
      const socket = (window as any).io();
      socket.on("connect", () => {
        socket.emit("room", id);
        const key = `${id}-elf`;
        const existingElf = localStorage.getItem(key);
        if (existingElf) {
          this.props.getElf(existingElf);
        } else {
          if (this.state.joinable) {
            this.props.postElf({
              email: loggedUser.email,
            });
          }
        }
      });
      socket.on("update", () => {
        this.props.getSecret();
      });
      this.setState({ joinable, editable, loaded: true });
    }
  }

  public render() {
    const { classes, secret, loggedUser } = this.props;
    const { editable, joinable } = this.state;
    const isOwner =
      loggedUser && secret.value && loggedUser.sub === secret.value.createdBy;
    const canEdit = isOwner && joinable;
    if (secret.fulfilled) {
      const link = `http://secretsanta.space/secret/${secret.value._id}`;
      return (
        <React.Fragment>
          {joinable ? (
            <Paper className={classes.topInfo}>
              Share the link{" "}
              <small>
                <a className={classes.link} href={link}>
                  {link}
                </a>
              </small>{" "}
              to let your friends join!
            </Paper>
          ) : editable ? (
            <Paper className={classes.paper}>
              This secret santa has now closed! Come back after the reveal date
              to see the list!
            </Paper>
          ) : null}
          {editable ? (
            <Paper className={classes.paper}>
              <div>
                <Typography variant="h2">
                  {secret.value.name}
                  <Chip
                    avatar={<Avatar>£</Avatar>}
                    label={secret.value.budget}
                    color="secondary"
                    className={classes.chip}
                  />
                  <Chip
                    avatar={
                      <Avatar>
                        <CalendarIcon />
                      </Avatar>
                    }
                    label={formatDate(secret.value.deadlineDate)}
                    color="secondary"
                    className={classes.chip}
                  />
                  <Chip
                    avatar={
                      <Avatar>
                        <CalendarIcon />
                      </Avatar>
                    }
                    label={formatDate(secret.value.revealDate)}
                    color="secondary"
                    className={classes.chip}
                  />
                  {canEdit ? (
                    <SecretSantaEdit secretSanta={secret.value} />
                  ) : null}
                </Typography>
              </div>
              {secret.value.elfs.map(currentElf => (
                <div key={currentElf._id} style={{ display: "inline-block" }}>
                  {this.renderElf(currentElf)}
                </div>
              ))}
            </Paper>
          ) : (
            <Paper className={classes.paper}>
              <SecretSantaMatches secret={secret.value} />
            </Paper>
          )}
        </React.Fragment>
      );
    } else if (secret.pending) {
      return <div>Loading</div>;
    } else {
      return <div>Error</div>;
    }
  }

  private renderElf = (currentElf: Elf) => {
    const { classes, elf, secret } = this.props;
    const { editable } = this.state;
    const isCurrent = elf && elf.fulfilled && elf.value._id === currentElf._id;
    return (
      <div className={classes.elf}>
        <Typography
          variant={
            elf && elf.fulfilled && elf.value._id === currentElf._id
              ? "subtitle1"
              : "subtitle2"
          }
        >
          {isCurrent ? `${currentElf.name} (You)` : currentElf.name}
        </Typography>
        {isCurrent && editable ? (
          <EditElf secretsanta={secret.value._id} elf={elf && elf.value}>
            <img
              src={`/static/imgs/displays/${currentElf.display}.png`}
              height={100}
            />
          </EditElf>
        ) : (
          <img
            src={`/static/imgs/displays/${currentElf.display}.png`}
            height={100}
          />
        )}
      </div>
    );
  };
}

export default connect((props: Props) => ({
  getElf: (id: string) => ({
    elf: {
      url: `/api/secretsanta/${props.router &&
        props.router.query &&
        props.router.query.id}/elf/${id}`,
    },
  }),
  getSecret: () => ({
    secret: {
      force: true,
      refreshing: true,
      url: `/api/secretsanta/${props.router &&
        props.router.query &&
        props.router.query.id}`,
    },
  }),
  postElf: (data: Partial<Elf>) => ({
    elf: {
      body: JSON.stringify(data),
      method: "POST",
      then: ({ _id }: Elf) => {
        const id = props.router.query && props.router.query.id;
        const key = `${id}-elf`;
        window.localStorage.setItem(key, _id);
      },
      url: `/api/secretsanta/${props.router &&
        props.router.query &&
        props.router.query.id}/elf`,
    },
  }),
  secret: `/api/secretsanta/${props.router &&
    props.router.query &&
    props.router.query.id}`,
}))(withStyles(styles)(Page));
