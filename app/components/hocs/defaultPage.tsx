import Head from "next/head";
import Router from "next/router";
import React from "react";
import {
  getUserFromCookie,
  getUserFromLocalStorage,
} from "../../../utils/auth";

export default (Page: any) =>
  class DefaultPage extends React.Component {
    public static getInitialProps(ctx: any) {
      console.info("process", process, (process as any).browser);
      const loggedUser = (process as any).browser
        ? getUserFromLocalStorage()
        : getUserFromCookie(ctx.req);
      const pageProps = Page.getInitialProps && Page.getInitialProps(ctx);
      return {
        ...pageProps,
        currentUrl: ctx.pathname,
        isAuthenticated: !!loggedUser,
        loggedUser,
      };
    }

    constructor(props: any) {
      super(props);
      this.logout = this.logout.bind(this);
    }

    public componentDidMount() {
      window.addEventListener("storage", this.logout, false);
    }

    public componentWillUnmount() {
      window.removeEventListener("storage", this.logout, false);
    }

    public render() {
      console.info("render");
      return (
        <div>
          <Head>
            <meta
              name="viewport"
              content="width=device-width, initial-scale=1"
            />
            <link href="https://unpkg.com/normalize.css@5.0.0/normalize.css' rel='stylesheet" />
            <title>Secret Santa</title>
          </Head>
          <div className="app">
            <div>
              <Page {...this.props} />
            </div>
          </div>
          <style jsx>{`
            .app {
              height: 100vh;
              width: 100vw;
            }

            .app div {
              max-width: 1024px;
              margin: 0 auto;
              padding: 30px;
            }
          `}</style>
          <style jsx global>{`
            * {
              margin: 0;
              font-family: Segoe UI, Roboto, Oxygen, Ubuntu, Cantarell,
                Fira Sans, Droid Sans, Helvetica Neue, sans-serif;
            }
          `}</style>
        </div>
      );
    }

    private logout(eve: any) {
      if (eve.key === "logout") {
        Router.push(`/?logout=${eve.newValue}`);
      }
    }
  };
