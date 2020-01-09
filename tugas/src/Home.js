import React, { Component } from "react";
import HomeHeader from "./component/Home-header";
import HomeHeaderLogin from "./component/Home-header-login";
import { connect } from "react-redux";

import Category from "./component/category";
import "./App.css";

class Home extends Component {
  // console.log(this.props.profile)
  render() {
    const { profile } = this.props.profile;
    console.log(profile);
    if (localStorage.getItem("token") != null) {
      return (
        <div className="Home">
          <HomeHeaderLogin profile={profile.image} />
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

const mapStateToProps = state => {
  return {
    profile: state.profile
  };
};

export default connect(mapStateToProps)(Home);
