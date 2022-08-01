import type { AppProps } from "next/app";
import { CssBaseline, ThemeProvider } from "@mui/material";
import darkTheme from "../config/darkTheme";
import { Layout } from "../components";
import StateManager from "../contexts/StateManager";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <ThemeProvider theme={darkTheme}>
        <CssBaseline />
        <StateManager>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </StateManager>
      </ThemeProvider>
    </>
  );
}

export default MyApp;
