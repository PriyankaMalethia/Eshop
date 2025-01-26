import React, { useCallback, useContext, useEffect } from "react";
import { useDispatch } from "react-redux";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import PageSetUp from "./components/pageSetUp/PageSetUp";
import useAuthentication from "./hooks/useAuthentication";
import { initCatalog } from "./store/actions/metadataAction";
import "./App.css";

// Theme configuration
const theme = createTheme({
  palette: {
    primary: {
      main: "#3f51b5",
    },
    secondary: {
      main: "#f50057",
    },
    disabled: {
      main: "#56595c",
    },
  },
});

function App() {
  // Authentication context and dispatch initialization
  const { AuthCtx } = useAuthentication();
  const { accessToken } = useContext(AuthCtx);
  const dispatch = useDispatch();

  // Initialize page data
  const initPageData = useCallback(() => {
    dispatch(initCatalog(accessToken));
  }, [dispatch, accessToken]);

  // Effect to trigger initialization on component mount
  useEffect(() => {
    initPageData();
  }, [initPageData]);

  return (
    <ThemeProvider theme={theme}>
      <PageSetUp />
    </ThemeProvider>
  );
}

export default App;
