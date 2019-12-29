import React, { Component } from "react";
import "./Component.css";

class HomeHeader extends Component {
  render() {
    return (
      <div className="header-bar">
        <div className="ticket-icon">
          <img src="https://ae01.alicdn.com/kf/HTB15dFTX.LrK1Rjy0Fjq6zYXFXas.jpg"></img>
        </div>
        <div className="register-icon">
          <img src="https://www.materialui.co/materialIcons/social/person_add_white_2048x2048.png"></img>
        </div>
        <div className="login-icon">
          <img src="http://cdn.onlinewebfonts.com/svg/img_311846.png"></img>
        </div>
      </div>
    );
  }
}

export default HomeHeader;
