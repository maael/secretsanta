import getConfig from "next/config";
import uuid from "uuid";
import { setSecret } from "./auth";

const getLock = (options?: any) => {
  const { publicRuntimeConfig } = getConfig();
  const { AUTH0_CLIENT_ID, AUTH0_CLIENT_DOMAIN } = publicRuntimeConfig;
  const Auth0Lock = require("auth0-lock").default;
  return new Auth0Lock(AUTH0_CLIENT_ID, AUTH0_CLIENT_DOMAIN, options);
};

const getBaseUrl = () => `${window.location.protocol}//${window.location.host}`;

const getOptions = (container: any) => {
  const secret = uuid.v4();
  setSecret(secret);
  return {
    auth: {
      params: {
        scope: "openid profile email",
        state: secret,
      },
      redirectUrl: `${getBaseUrl()}/auth/signed-in`,
      responseType: "id_token",
    },
    closable: false,
    container,
  };
};

export const show = (container: any) => getLock(getOptions(container)).show();
export const logout = () => getLock().logout({ returnTo: getBaseUrl() });
