import React, { Component } from "react";
import HomeHeader from "../component/Home-header";
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
        <HomeHeader profile={profile.image} name={profile.name} />
        <div className="content-payment">
          <h1 id="payment-title">Payment</h1>
          <div id="payment-container">
            {this.state.event.map((entry, index) => {
              return (
                <div key={index} className="payment-item">
                  <div className="payment-order">
                    <div className="payment-order-name">
                      <h2 id="payment-order-name-name">
                        {entry.buyer ? entry.buyer.name : ""}
                      </h2>
                      <p id="payment-order-total-price">
                        Face Value Rp. {entry.event ? entry.event.price : ""}
                      </p>
                    </div>
                    <h1 id="payment-order-event-title">
                      {entry.event ? entry.event.title : ""}
                    </h1>
                    <p id="payment-order-start-time">
                      Date{" "}
                      {entry.event ? entry.event.startTime.slice(0, 10) : ""} At{" "}
                      {entry.event ? entry.event.startTime.slice(11, 16) : ""}
                    </p>
                    <p id="payment-order-event-address">
                      Address : {entry.event ? entry.event.address : ""}
                    </p>
                  </div>
                  <div id="shopping-summary">
                    <h2>Shopping Summary</h2>
                    <div id="total-price">
                      <p>Total Price ({entry.quantity} Item)</p>
                      <p>Rp.{entry.totalPrice}</p>
                    </div>
                    <hr></hr>
                    <div id="confirm">
                      <img
                        src="https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcQw6cxYSIfxYoAmptLanTLW7QBNSkjYyFaJd16b7TgQC5DfO_Pg"
                        id="struc-image"
                      ></img>
                      <Button
                        id="button-confirmed"
                        onClick={() => this.Confirmed(entry.id)}
                      >
                        CONFIRM
                      </Button>
                    </div>
                  </div>
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
