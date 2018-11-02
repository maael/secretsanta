import CssBaseline from "@material-ui/core/CssBaseline";
import { MuiThemeProvider } from "@material-ui/core/styles";
import App, { AppProps, Container, DefaultAppIProps } from "next/app";
import React from "react";
import JssProvider from "react-jss/lib/JssProvider";
import Outline from "../app/components/templates/Outline";
import StateContainer from "../app/components/templates/StateContainer";
import getPageContext from "../app/lib/getPageContext";

class MyApp extends App<AppProps & DefaultAppIProps> {
  private pageContext: any;

  constructor(props: AppProps & DefaultAppIProps) {
    super(props);
    this.pageContext = getPageContext();
  }

  public componentDidMount() {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector("#jss-server-side");
    if (jssStyles && jssStyles.parentNode) {
      jssStyles.parentNode.removeChild(jssStyles);
    }
  }

  public render() {
    const { Component, pageProps } = this.props;
    return (
      <Container>
        <JssProvider
          registry={this.pageContext.sheetsRegistry}
          generateClassName={this.pageContext.generateClassName}
        >
          <MuiThemeProvider
            theme={this.pageContext.theme}
            sheetsManager={this.pageContext.sheetsManager}
          >
            <CssBaseline />
            <StateContainer>
              <Outline>
                <Component pageContext={this.pageContext} {...pageProps} />
              </Outline>
            </StateContainer>
          </MuiThemeProvider>
        </JssProvider>
      </Container>
    );
  }
}

export default MyApp;
