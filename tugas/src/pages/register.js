import React, { Component } from "react";
import { register } from "../config/api";
import "./Pages.css";

class Register extends Component {
  constructor() {
    super();
    this.state = {
      name: "",
      email: "",
      username: "",
      password: "",
      phone: "",
      errors: {}
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  onSubmit(e) {
    e.preventDefault();

    const user = {
      name: this.state.name,
      email: this.state.email,
      username: this.state.username,
      password: this.state.password,
      phone: this.state.phone
    };

    register(user).then(() => {
      if (localStorage.getItem("token")) {
        window.location = "/";
      } else {
        window.location = "/register";
        alert("Wrong Password or email");
      }
    });
  }

  render() {
    return (
      <div>
        <div className="login" onSubmit={this.onSubmit}>
          <form id="login">
            <h3 id="login-title">REGISTER</h3>
            <input
              type="text"
              placeholder="Name"
              name="name"
              id="email"
              onChange={this.onChange}
            ></input>
            <input
              type="text"
              placeholder="Email"
              name="email"
              id="email"
              onChange={this.onChange}
            ></input>
            <input
              type="text"
              placeholder="Username"
              name="username"
              id="password"
              onChange={this.onChange}
            ></input>
            <input
              type="text"
              placeholder="Phone"
              name="phone"
              id="password"
              onChange={this.onChange}
            ></input>
            <input
              type="text"
              placeholder="Password"
              name="password"
              id="password"
              onChange={this.onChange}
            ></input>
            <button type="submit" id="button">
              login
            </button>
          </form>
        </div>
      </div>
    );
  }
}

export default Register;
