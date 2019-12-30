import React, { Component } from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import HomeHeader from "./component/Home-header";
import Home from "./Home";
import Login from "./component/login";
import Category from "./component/category";
import "./App.css";

function App() {
  return (
    <Router>
      <div>
        <Switch>
          <Route path="/HomeHeader">
            <HomeHeader />
          </Route>
          <Route path="/Login">
            <Login />
          </Route>
          <Route path="/category">
            <Category />
          </Route>
          <Route path="/">
            <Home />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
