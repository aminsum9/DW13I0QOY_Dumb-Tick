import React, { Component } from "react";
import HomeHeaderLogin from "../component/Home-header-login";
import Footer from "../component/footer";
import { connect } from "react-redux";
import axios from "axios";
import Button from "@material-ui/core/Button";
import "./Pages.css";

class Payment extends Component {
  constructor() {
    super();
    this.state = {
      tes: [1, 2],
      orders: [],
      event: []
    };
  }

  Confirmed = data => {
    let token = localStorage.getItem("token");
    axios.defaults.headers["Authorization"] = "Bearer " + token;
    axios
      .put(`http://localhost:5000/api/eo/order/${data}`, {
        status: "confirmed"
      })
      .then(response => alert("success"), (window.location = "/Payment"));
  };

  componentDidMount() {
    let token = localStorage.getItem("token");
    axios.defaults.headers["Authorization"] = "Bearer " + token;
    axios.get(`http://localhost:5000/api/eo/order?status=pending`).then(res => {
      const data = res.data;
      // console.log(res);
      this.setState({ event: data });
    });
  }

  render() {
    const { profile } = this.props.profile;
    return (
      <div>
        <HomeHeaderLogin profile={profile.image} />
        <div className="content">
          <h1 id="payment-title">Payment</h1>
          <div id="payment-container">
            {this.state.event.map((entry, index) => {
              return (
                <div key={index} className="payment-item">
                  <div className="payment-order">
                    <div className="payment-order-name"></div>
                    <h1>{entry.event ? entry.event.title : ""}</h1>
                    <p style={{ marginLeft: "10px" }}>
                      Buyer id : {entry.buyer_id}
                    </p>
                    <p style={{ marginLeft: "10px" }}>
                      Quantity : {entry.quantity}
                    </p>
                    <Button
                      style={{
                        background: "magenta",
                        position: "relative",
                        left: "600px"
                      }}
                      onClick={() => this.Confirmed(entry.id)}
                    >
                      {entry.status}
                    </Button>
                  </div>

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

const mapStateToProps = state => {
  return {
    profile: state.profile
  };
};

export default connect(mapStateToProps)(Payment);
