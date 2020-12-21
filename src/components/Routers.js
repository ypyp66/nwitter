import { useRef, useState } from "react";
import { HashRouter as Router, Route, Switch } from "react-router-dom";
import Auth from "../routes/Auth";
import Home from "../routes/Home";

const Routers = ({ isLoggedIn }) => {
  return (
    <Router>
      <Switch>
        <Route exact path="/">
          {isLoggedIn ? <Home /> : <Auth />}
        </Route>
      </Switch>
    </Router>
  );
};

export default Routers;
