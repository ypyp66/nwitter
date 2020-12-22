import { useRef, useState } from "react";
import { HashRouter as Router, Route, Switch } from "react-router-dom";
import Auth from "../routes/Auth";
import Home from "../routes/Home";
import Navigation from "./Navigation";

const Routers = ({ isLoggedIn, userObj }) => {
  return (
    <Router>
      {isLoggedIn && <Navigation />}
      <Switch>
        <Route exact path="/">
          {isLoggedIn ? <Home userObj={userObj} /> : <Auth />}
        </Route>
      </Switch>
    </Router>
  );
};

export default Routers;
