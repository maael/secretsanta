import Cookie from "js-cookie";
import jwtDecode from "jwt-decode";

const getQueryParams = () => {
  const params = {};
  window.location.href.replace(
    /([^(?|#)=&]+)(=([^&]*))?/g,
    (_1, $1, _2, $3): any => {
      (params as any)[$1] = $3;
    },
  );
  return params;
};

export const extractInfoFromHash = () => {
  if (!window || !window.localStorage) {
    return undefined;
  }

  const { id_token, state } = getQueryParams() as {
    id_token: string;
    state: string;
  };
  return { token: id_token, secret: state };
};

export const setToken = (token: string) => {
  if (!window || !window.localStorage) {
    return;
  }
  window.localStorage.setItem("token", token);
  try {
    const jwt = jwtDecode(token);
    window.localStorage.setItem("user", JSON.stringify(jwt));
  } catch (e) {
    console.error("Error getting user from token", token, e);
    unsetToken();
    return;
  }
  Cookie.set("jwt", token);
  window.location.href = "/";
};

export const unsetToken = () => {
  if (!window || !window.localStorage) {
    return;
  }
  window.localStorage.removeItem("token");
  window.localStorage.removeItem("user");
  window.localStorage.removeItem("secret");
  Cookie.remove("jwt");

  window.localStorage.setItem("logout", `${Date.now()}`);
};

export const getUserFromCookie = (req: any) => {
  if (!req || !req.headers || !req.headers.cookie) {
    return undefined;
  }
  const jwtCookie = req.headers.cookie
    .split(";")
    .find((c: string) => c.trim().startsWith("jwt="));
  if (!jwtCookie) {
    return undefined;
  }
  const jwt = jwtCookie.split("=")[1];
  return jwtDecode(jwt);
};

export const getUserFromLocalStorage = () => {
  const json = window.localStorage && window.localStorage.user;
  return json ? JSON.parse(json) : undefined;
};

export const setSecret = (secret: string) =>
  window.localStorage.setItem("secret", secret);

export const checkSecret = (secret: string) =>
  window.localStorage.secret === secret;
