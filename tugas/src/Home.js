import React, { Component } from "react";
import HomeHeader from "./component/Home-header";
import { connect } from "react-redux";

import Category from "./component/category";
import "./App.css";

class Home extends Component {
  // console.log(this.props.profile)
  render() {
    const token = localStorage.getItem("token");
    const { profile } = this.props.profile;
    return (
      <div className="Home">
        {token != null && (
          <HomeHeader profile={profile.image} name={profile.name} />
        )}
        {token == null && <HomeHeader />}
        <Category />
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    profile: state.profile
  };
};

export default connect(mapStateToProps)(Home);
