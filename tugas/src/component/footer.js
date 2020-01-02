import React, { Component } from "react";

class Footer extends Component {
  render() {
    return (
      <div>
        <footer>
          <div id="footer-a">
            <h1>DUMB TICK</h1>
            <p>
              Dumb-Tick is a web bassed platform that provides tickets for
              various events around sports, music, science, and programming
            </p>
          </div>
          <div id="footer-b">
            <h3>LINK</h3>
            <h4>About Us</h4>
            <br></br>
            <h3>Follow Us On</h3>
            <p>Instagram</p>
            <p>Twitter</p>
            <br></br>
            <br></br>
            <p style={{ margin: "auto" }}>Copyright 2019 Dumb-Tick</p>
          </div>
          <div id="footer-c">
            <h3>Have Question?</h3>
            <p>Dumb-Tick</p>
            <p>Email: support@dumbtick.com</p>
          </div>
        </footer>
      </div>
    );
  }
}

export default Footer;
