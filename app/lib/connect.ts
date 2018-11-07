import fetch from "isomorphic-fetch";
// @ts-ignore
import { connect, PromiseState } from "react-refetch";
// @ts-ignore

export default connect.defaults({
  fetch,
  headers: {
    "x-user": () => {
      try {
        return JSON.parse(localStorage.user).sub;
      } catch (e) {
        console.error("error getting user");
      }
    },
  },
});

export const ConnectState = PromiseState;
