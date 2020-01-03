import React, { Component } from "react";
import HomeHeaderLogin from "../component/Home-header-login";
import Footer from "../component/footer";
import axios from "axios";
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

  // dataOrders = () => {
  //   return axios.get(`http://localhost:5000/api/eo/orders`).then(res => {
  //     // const data2 = res.event_id;
  //     // console.log(res.event_id);
  //     this.setState({ orders: res });
  //   });
  // };

  componentDidMount() {
    let token = localStorage.getItem("token");
    axios.defaults.headers["Authorization"] = "Bearer " + token;
    axios.get(`http://localhost:5000/api/eo/ordersevent`).then(res => {
      const data = res.data;
      // console.log(res);
      this.setState({ event: data });
    });
    axios.get(`http://localhost:5000/api/eo/orders`).then(res => {
      // const data2 = res.event_id;
      // console.log(res);
      this.setState({ orders: res.data });
    });
  }

  render() {
    console.log(this.state.orders);
    console.log(this.state.event);
    return (
      <div>
        <HomeHeaderLogin />
        <div className="content">
          <h1 id="payment-title">Payment</h1>
          <div id="payment-container">
            {this.state.event.map((entry, index) => {
              return this.state.orders.map((dataa, index) => {
                if (dataa.event_id == entry.id) {
                  return (
                    <div key={index} className="payment-item">
                      <div className="payment-order">
                        <div className="payment-order-name">
                          {dataa.buyer_id}
                        </div>
                      </div>
                      <br></br>
                      <br></br>
                      <br></br>
                      <br></br>
                      <hr style={{ width: "80%", margin: "auto" }}></hr>
                    </div>
                  );
                }
              });
            })}
          </div>
        </div>
        <Footer />
      </div>
    );
  }
}

export default Payment;
