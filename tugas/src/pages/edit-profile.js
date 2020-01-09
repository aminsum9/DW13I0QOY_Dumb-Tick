import React, { Component } from "react";
import HomeHeaderLogin from "../component/Home-header-login";
//Import Component
import { connect } from "react-redux";
import { getProfile } from "../_actions/profile";
import "./Pages.css";
import Footer from "../component/footer";
import { updateProfile } from "../config/api";
//Import material-ui
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";

class EditProfile extends Component {
  constructor() {
    super();
    this.state = {
      name: "",
      email: "",
      username: "",
      password: "",
      phone: "",
      image: "",
      errors: {}
    };

    this.onChange = this.onChange.bind(this);
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  onClick = e => {
    e.preventDefault();

    const data = {
      name: this.state.name,
      email: this.state.email,
      username: this.state.username,
      password: this.state.password,
      phone: this.state.phone
    };
    updateProfile(data);
  };

  componentDidMount() {
    const { profile } = this.props.profile;
    console.log(profile);
    this.setState({
      name: profile.name,
      email: profile.email,
      username: profile.username,
      password: profile.password,
      phone: profile.phone,
      image: profile.image
    });
  }

  render() {
    const { profile } = this.props.profile;
    return (
      <div>
        <HomeHeaderLogin profile={profile.image} />
        <div id="title-edit-profile">
          <h1>Edit Profile</h1>
        </div>
        <div className="edit-profile">
          <form>
            <label for="name">Name :</label>
            <input
              className="edit-profile-input"
              type="text"
              required
              name="name"
              id="name"
              onChange={this.onChange}
              value={this.state.name}
            ></input>
            <label for="username">Username :</label>
            <input
              className="edit-profile-input"
              required
              name="username"
              id="username"
              onChange={this.onChange}
              value={this.state.username}
            ></input>
            <label for="emaill">Email :</label>
            <input
              className="edit-profile-input"
              required
              name="email"
              id="emaill"
              onChange={this.onChange}
              value={this.state.email}
            ></input>
            <label for="phone">Phone Number :</label>
            <input
              className="edit-profile-input"
              required
              name="phone"
              id="phone"
              onChange={this.onChange}
              value={this.state.phone}
            ></input>
            <label for="passwordd">Password :</label>
            <input
              className="edit-profile-input"
              required
              name="password"
              id="passwordd"
              onChange={this.onChange}
              value={this.state.password}
              onChange
            ></input>
            <label for="image">Image :</label>
            <input
              className="edit-profile-input"
              required
              name="image"
              id="image"
              onChange={this.onChange}
              value={this.state.image}
            ></input>
            <div id="edit-profile-submit-button">
              <Button
                type="button"
                variant="contained"
                color="secondary"
                onClick={this.onClick}
              >
                Edit Profile
              </Button>
            </div>
          </form>
        </div>
        <Footer />
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    profile: state.profile
  };
};

export default connect(mapStateToProps)(EditProfile);
