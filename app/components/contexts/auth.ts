import React from "react";
import { IsAuthenticated, LoggedUser } from "../../../types";

export interface Consumer {
  isAuthenticated: IsAuthenticated;
  loggedUser?: LoggedUser;
}

const context: Consumer = {
  isAuthenticated: false,
  loggedUser: undefined,
};

export const Context = React.createContext(context);

export const AuthProvider = Context.Provider;
export const AuthConsumer = Context.Consumer;
