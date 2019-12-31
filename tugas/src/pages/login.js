import React, { Component } from "react";
import { login } from "../config/api";
import "./Pages.css";

class Login extends Component {
  // For Login
  constructor() {
    super();
    this.state = {
      email: "",
      password: "",
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
      email: this.state.email,
      password: this.state.password
    };

    login(user).then(() => {
      if (localStorage.getItem("token")) {
        window.location = "/";
      } else {
        window.location = "/login";
        alert("Wrong Password or email");
      }
    });
  }

  render() {
    return (
      <div>
        <div className="login" onSubmit={this.onSubmit}>
          <form id="login">
            <h3 id="login-title">LOGIN</h3>
            <input
              type="text"
              placeholder="email"
              name="email"
              id="email"
              onChange={this.onChange}
            ></input>
            <input
              name="password"
              type="password"
              placeholder="password"
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

export default Login;
