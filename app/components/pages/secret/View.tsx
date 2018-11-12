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

interface Props {
  secret: PromiseState<SecretSanta>;
  elf?: PromiseState<Elf>;
  postElf: (d: Partial<Elf>) => PromiseState<Elf>;
  getElf: (id: string) => PromiseState<Elf>;
  getSecret: () => PromiseState<SecretSanta>;
  router: RouterProps;
  loggedUser: LoggedUser;
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
}));

class Page extends React.Component<Props & WithStyles> {
  public componentDidMount() {
    const { router, loggedUser } = this.props;
    const id = router && router.query && router.query.id;
    const socket = (window as any).io();
    socket.on("connect", () => {
      socket.emit("room", id);
      const key = `${id}-elf`;
      const existingElf = localStorage.getItem(key);
      if (existingElf) {
        this.props.getElf(existingElf);
      } else {
        this.props.postElf({
          email: loggedUser.email,
        });
      }
    });
    socket.on("update", () => {
      this.props.getSecret();
    });
  }

  public render() {
    const { classes, secret, loggedUser } = this.props;
    const isOwner =
      loggedUser && secret.value && loggedUser.sub === secret.value.createdBy;
    const canEdit = isOwner && new Date(secret.value.deadlineDate) > new Date();
    if (secret.fulfilled) {
      return (
        <React.Fragment>
          <Paper style={{ padding: 10, margin: 10 }}>
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
    const editable = elf && elf.fulfilled && elf.value._id === currentElf._id;
    return (
      <div className={classes.elf}>
        <Typography
          variant={
            elf && elf.fulfilled && elf.value._id === currentElf._id
              ? "subtitle1"
              : "subtitle2"
          }
        >
          {editable ? `${currentElf.name} (You)` : currentElf.name}
        </Typography>
        {editable ? (
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

export default connect((props: Props, context: any) => ({
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
