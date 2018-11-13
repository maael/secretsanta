import React from "react";
import { SecretSanta } from "../../../types";

export default ({ secret }: { secret: SecretSanta }) => (
  <div>
    Revealed {secret.name} {JSON.stringify(secret.pairings)}
  </div>
);
