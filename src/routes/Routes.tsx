import React, { useEffect } from "react";
import { Route, Switch } from "react-router-dom";
import Auth from "../pages/auth/Auth";
import Index from "../pages/Index";
import Common from "../components/layout/Common";
import MainApp from "../components/layout/MainApp";
import Issues from "../pages/Issues";
import { paths } from "./paths";
import NotFound from "../pages/NotFound";
import { useSelector } from "react-redux";
import { RootState } from "../store";

const Routes = () => {
  const { isLoggedIn } = useSelector((state: RootState) => state.auth);
  useEffect(() => {}, [isLoggedIn]);
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
      <Route component={NotFound} exact={true} />
    </Switch>
  );
};

export default Routes;
