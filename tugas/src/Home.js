import React, { Component } from "react";
import HomeHeader from "./component/Home-header";
import Category from "./component/category";
import "./App.css";

class Home extends Component {
  render() {
    return (
      <div className="Home">
        <HomeHeader />
        <Category />
      </div>
    );
  }
}

export default Home;
