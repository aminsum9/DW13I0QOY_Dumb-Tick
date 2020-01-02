import React, { Component } from "react";
//Import Component
import HomeHeaderLogin from "../component/Home-header-login";
import axios from "axios";
import Footer from "../component/footer";
import "./Pages.css";

class Profile extends Component {
  constructor(props) {
    super();
    this.state = { profile: [] };
  }

  componentDidMount() {
    if (localStorage.getItem("token")) {
      let token = localStorage.getItem("token");
      axios.defaults.headers["Authorization"] = "Bearer " + token;
      axios.get(`http://localhost:5000/api/eo/profile`).then(res => {
        const profile = res.data;
        console.log(res.data);
        this.setState({ profile });
      });
    }
  }

  render() {
    return (
      <div className="container">
        <HomeHeaderLogin />
        <div className="content">
          <div className="profile-title">
            <h1 id="title">Profile</h1>
          </div>
          <div className="profile-data">
            <div className="data-profile">
              <h1>{this.state.profile.name}</h1>
              <p id="profile-phone">{this.state.profile.phone}</p>
              <p id="profile-phone">{this.state.profile.email}</p>
            </div>
            <div className="image-profile">
              <img src={this.state.profile.image}></img>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }
}

export default Profile;
