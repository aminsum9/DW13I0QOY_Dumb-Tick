import React, { Component } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
//Import Component
import HomeHeader from "./component/Home-header";
import Home from "./Home";
import Login from "./pages/login";
import Register from "./pages/register";
import Category from "./component/category";
import CategoryPage from "./pages/category-page";
import EventDetail from "./pages/eventdetail";
import Profile from "./pages/profile";
import Tickets from "./pages/tickets";
import Payment from "./pages/payment";
import AddEvent from "./pages/addevent";
import EditProfile from "./pages/edit-profile";
import "./App.css";

class App extends Component {
  render() {
    if (localStorage.getItem("token") != null) {
      return (
        <Router>
          <div>
            <Switch>
              <Route path="/HomeHeader">
                <HomeHeader />
              </Route>
              <Route path="/edit-profile">
                <EditProfile />
              </Route>
              <Route path="/category/:category_id/events">
                <CategoryPage />
              </Route>
              <Route path="/category">
                <Category />
              </Route>
              <Route path="/event/:event_id">
                <EventDetail />
              </Route>
              <Route path="/Profile">
                <Profile />
              </Route>
              <Route path="/Tickets">
                <Tickets />
              </Route>
              <Route path="/Payment">
                <Payment />
              </Route>
              <Route path="/Addevent">
                <AddEvent />
              </Route>
              <Route path="/">
                <Home />
              </Route>
            </Switch>
          </div>
        </Router>
      );
    } else {
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
              <Route path="/Register">
                <Register />
              </Route>
              <Route path="/category/:category_id/events">
                <CategoryPage />
              </Route>
              <Route path="/category">
                <Category />
              </Route>
              <Route path="/event/:event_id">
                <EventDetail />
              </Route>
              <Route path="/">
                <Home />
              </Route>
            </Switch>
          </div>
        </Router>
      );
    }
  }
}

export default App;
