import { RouterProps } from "next/router";
import React from "react";
import { LoggedUser, SecretSanta } from "../../../types";
import connect from "../../lib/connect";
import SecretSantaForm, {
  State as SantaState,
} from "../organisms/SecretSantaForm";
import SecretSantaList from "../organisms/SecretSantaList";

interface Props {
  post: (d: Partial<SecretSanta>) => Promise<SecretSanta>;
  router: RouterProps;
  loggedUser: LoggedUser;
}

const Page: React.SFC<Props> = ({ post, loggedUser }) => {
  function onSubmit(data: SantaState) {
    post(data);
  }

  return (
    <React.Fragment>
      <SecretSantaForm onSubmit={onSubmit} />
      <SecretSantaList type="created" loggedUser={loggedUser} />
      <SecretSantaList type="participating" loggedUser={loggedUser} />
    </React.Fragment>
  );
};

export default connect((props: Props) => ({
  post: (data: Partial<SecretSanta>) => ({
    map: {
      body: JSON.stringify(data),
      method: "POST",
      then: ({ _id }: SecretSanta) => {
        props.router.push(`/secret/${_id}`);
      },
      url: "/api/secretsanta",
    },
  }),
}))(Page);
