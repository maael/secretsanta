import Document, {
  DefaultDocumentIProps,
  DocumentProps,
  Head,
  Main,
  NextScript,
} from "next/document";
import React from "react";
import flush from "styled-jsx/server";
// import {
//   getUserFromCookie,
//   getUserFromLocalStorage,
// } from "../utils/auth";

class MyDocument extends Document<DefaultDocumentIProps & DocumentProps> {
  public static getInitialProps(ctx: any) {
    let pageContext;
    const page = ctx.renderPage((Component: any) => {
      console.info("BROWSER", (process as any).browser);
      // const loggedUser = (process as any).browser
      //   ? getUserFromLocalStorage()
      //   : getUserFromCookie(ctx.req);
      // console.info("LGOGED", loggedUser);
      const WrappedComponent = (props: any) => {
        pageContext = props.pageContext;
        return <Component {...props} />;
      };

      return WrappedComponent;
    });

    return {
      ...page,
      pageContext,
      styles: (
        <React.Fragment>
          <style
            id="jss-server-side"
            dangerouslySetInnerHTML={{
              __html: (pageContext as any).sheetsRegistry.toString(),
            }}
          />
          {flush() || null}
        </React.Fragment>
      ),
    };
  }

  public render() {
    const { pageContext } = this.props as any;

    return (
      <html lang="en" dir="ltr">
        <Head>
          <meta charSet="utf-8" />
          <meta
            name="viewport"
            content="minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no"
          />
          <meta
            name="theme-color"
            content={pageContext.theme.palette.primary.main}
          />
          <link
            rel="stylesheet"
            href="https://fonts.googleapis.com/css?family=Roboto:300,400,500"
          />
          <script src="/socket.io/socket.io.js" />
        </Head>
        <body style={{ background: pageContext.theme.palette.primary.dark }}>
          <Main />
          <NextScript />
        </body>
      </html>
    );
  }
}

export default MyDocument;
