import green from "@material-ui/core/colors/green";
import red from "@material-ui/core/colors/red";
import {
  createGenerateClassName,
  createMuiTheme,
} from "@material-ui/core/styles";
import { SheetsRegistry } from "jss";

const theme = createMuiTheme({
  palette: {
    primary: {
      dark: red[800],
      light: red[500],
      main: red[900],
    },
    secondary: {
      dark: green[700],
      light: green[300],
      main: green[500],
    },
  },
  typography: {
    useNextVariants: true,
  },
});

function createPageContext() {
  return {
    generateClassName: createGenerateClassName(),
    sheetsManager: new Map(),
    sheetsRegistry: new SheetsRegistry(),
    theme,
  };
}

export default function getPageContext() {
  if (!(process as any).browser) {
    return createPageContext();
  }

  if (!(global as any).__INIT_MATERIAL_UI__) {
    (global as any).__INIT_MATERIAL_UI__ = createPageContext();
  }

  return (global as any).__INIT_MATERIAL_UI__;
}
