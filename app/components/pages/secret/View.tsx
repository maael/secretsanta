import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import { RouterProps } from "next/router";
import React from "react";
import connect from "../../../lib/connect";
import { Elf, PromiseState, SecretSanta } from "../../../types";

interface Props {
  secret: PromiseState<SecretSanta>;
  elf?: PromiseState<Elf>;
  postElf: (d: Partial<Elf>) => PromiseState<Elf>;
  getElf: (id: string) => PromiseState<Elf>;
  getSecret: () => PromiseState<SecretSanta>;
  router: RouterProps;
}

class Page extends React.Component<Props> {
  public componentDidMount() {
    const { router } = this.props;
    const id = router && router.query && router.query.id;
    const socket = (window as any).io();
    socket.on("connect", () => {
      socket.emit("room", id);
      const key = `${id}-elf`;
      const existingElf = localStorage.getItem(key);
      if (existingElf) {
        this.props.getElf(existingElf);
      } else {
        this.props.postElf({});
      }
    });
    socket.on("update", () => {
      this.props.getSecret();
    });
  }

  public render() {
    const { elf, secret } = this.props;
    if (secret.fulfilled) {
      return (
        <Paper>
          <Typography variant="h2">{secret.value.name}</Typography>
          {secret.value.elfs.map(({ _id, name }) => (
            <Typography
              key={_id}
              variant={
                elf && elf.fulfilled && elf.value._id === _id
                  ? "body1"
                  : "body2"
              }
            >
              {name}{" "}
              {elf && elf.fulfilled && elf.value._id === _id ? "(You)" : ""}
            </Typography>
          ))}
        </Paper>
      );
    } else if (secret.pending) {
      return <div>Loading</div>;
    } else {
      return <div>Error</div>;
    }
  }
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
}))(Page);
