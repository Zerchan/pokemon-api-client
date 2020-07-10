import React from "react";
import { Switch, Route } from "react-router-dom";

import HomePage from "../pages/home";
import DetailsPage from "../pages/details";

const Routes = () => {
  return (
    <Switch>
      <Route exact path="/" component={HomePage} />
      <Route exact path="/details/:id" component={DetailsPage} />
    </Switch>
  );
};

export default Routes;
