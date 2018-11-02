import fetch from "isomorphic-fetch";
// @ts-ignore
import { connect, PromiseState } from "react-refetch";
// @ts-ignore

export default connect.defaults({
  fetch,
});

export const ConnectState = PromiseState;
