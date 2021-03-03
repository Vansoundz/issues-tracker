import React from "react";
import { Route, Switch } from "react-router-dom";
import Auth from "../pages/auth/Auth";
import Index from "../pages/Index";
import Common from "../components/layout/Common";
import MainApp from "../components/layout/MainApp";
import Issues from "../pages/Issues";
import { paths } from "./paths";

const Routes = () => {
  return (
    <Switch>
      <Route path={paths.index} exact component={Index} />
      <Route path={paths.auth} exact component={Auth} />
      <MainApp>
        <Route path={paths.issues} exact component={Issues} />
        <Route path={paths.projects} exact component={Common} />
        <Route path={paths.milestones} exact component={Common} />
        <Route path={paths.pull} exact component={Common} />
      </MainApp>
    </Switch>
  );
};

export default Routes;
