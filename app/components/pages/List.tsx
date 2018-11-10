import Typography from "@material-ui/core/Typography";
import { RouterProps } from "next/router";
import React from "react";
import { LoggedUser, SecretSanta } from "../../../types";
import connect from "../../lib/connect";
import SecretSantaFormContainer from "../atoms/SecretSantaFormContainer";
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
    <SecretSantaFormContainer>
      <Typography variant="h6">Create Secret Santa</Typography>
      <SecretSantaForm onSubmit={onSubmit} />
      {loggedUser && loggedUser.sub ? (
        <React.Fragment>
          <SecretSantaList type="created" loggedUser={loggedUser} />
          <SecretSantaList type="participating" loggedUser={loggedUser} />
        </React.Fragment>
      ) : null}
    </SecretSantaFormContainer>
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
