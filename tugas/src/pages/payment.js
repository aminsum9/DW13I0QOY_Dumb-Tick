import React, { Component } from "react";
import HomeHeaderLogin from "../component/Home-header-login";
import Footer from "../component/footer";
import "./Pages.css";

class Payment extends Component {
  render() {
    return (
      <div>
        <HomeHeaderLogin />
        <div className="content">
          <h1 id="payment-title">Payment</h1>
          <div id="payment-container">
            {[1, 2, 3].map((entry, index) => {
              return (
                <div key={index} className="payment-item">
                  <div className="payment-order">
                    <div className="payment-order-name"></div>
                  </div>
                  <br></br>
                  <br></br>
                  <br></br>
                  <br></br>
                  <hr style={{ width: "80%", margin: "auto" }}></hr>
                </div>
              );
            })}
          </div>
        </div>
        <Footer />
      </div>
    );
  }
}

export default Payment;
