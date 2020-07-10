import React from "react";
import CssBaseline from "@material-ui/core/CssBaseline";
import { BrowserRouter as Router } from "react-router-dom";
import Routes from "./routes";
import Layout from "./pages/layout";
import ContextProvider from "./context";

function App() {
  return (
    <ContextProvider>
      <CssBaseline />
      <Router>
        <Layout />
        <Routes />
      </Router>
    </ContextProvider>
  );
}

export default App;
