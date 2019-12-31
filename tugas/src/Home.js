import React, { Component } from "react";
import HomeHeader from "./component/Home-header";
import HomeHeaderLogin from "./component/Home-header-login";
import Category from "./component/category";
import "./App.css";

class Home extends Component {
  render() {
    if (localStorage.getItem("token") != null) {
      return (
        <div className="Home">
          <HomeHeaderLogin />
          <Category />
        </div>
      );
    } else {
      return (
        <div className="Home">
          <HomeHeader />
          <Category />
        </div>
      );
    }
  }
}

export default Home;
