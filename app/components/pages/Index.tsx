import { RouterProps } from "next/router";
import React from "react";
import connect from "../../lib/connect";
import { SecretSanta } from "../../types";
import SecretSantaForm, {
  State as SantaState,
} from "../organisms/SecretSantaForm";

interface Props {
  post: (d: Partial<SecretSanta>) => Promise<SecretSanta>;
  router: RouterProps;
}

const Page: React.SFC<Props> = ({ post }) => {
  function onSubmit(data: SantaState) {
    post(data);
  }

  return <SecretSantaForm onSubmit={onSubmit} />;
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
