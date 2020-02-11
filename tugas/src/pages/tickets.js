import React, { Component } from "react";
import HomeHeader from "../component/Home-header";
import Footer from "../component/footer";
import { connect } from "react-redux";
import axios from "axios";
import "./Pages.css";
//Import material-ui
import RoomIcon from "@material-ui/icons/Room";

class Tickets extends Component {
  constructor(props) {
    super();
    this.state = { tickets: [], profile: [] };
  }

  componentDidMount() {
    if (localStorage.getItem("token")) {
      let token = localStorage.getItem("token");
      axios.defaults.headers["Authentication"] = "Bearer " + token;
      axios
        .get("http://localhost:5000/api/eo/order?status=confirmed")
        .then(res => {
          const tickets = res.data;
          this.setState({ tickets });
        });
    }
    if (localStorage.getItem("token")) {
      let token = localStorage.getItem("token");
      axios.defaults.headers["Authorization"] = "Bearer " + token;
      axios.get(`http://localhost:5000/api/eo/profile`).then(res => {
        const profile = res.data.id;
        this.setState({ profile });
      });
    }
  }

  render() {
    const { profile } = this.props.profile;
    return (
      <div className="container">
        <HomeHeader profile={profile.image} name={profile.name} />
        <div className="ticket-container">
          <h3 id="my-ticket-title">My Ticket</h3>
          <div className="content tickets">
            <div className="tickets-contain">
              {this.state.tickets.map((ticket, index) => {
                if (this.state.profile == ticket.buyer_id) {
                  return (
                    <div key={index} className="ticket">
                      <div className="ticket-detail-top">
                        <div className="ticket-profile-name">
                          <h3>{profile.name}</h3>
                        </div>
                        <div className="ticket-total-price">
                          <div className="ticket-total-price-contain">
                            <h3>Price </h3>
                            <p>Rp.{ticket.event ? ticket.event.price : ""}</p>
                          </div>
                        </div>
                      </div>
                      <div className="ticket-detail">
                        <h1>{ticket.event ? ticket.event.title : ""}</h1>
                        <p>
                          Time :{" "}
                          {ticket.event
                            ? ticket.event.startTime.slice(0, 10)
                            : ""}{" "}
                          at{" "}
                          {ticket.event
                            ? ticket.event.startTime.slice(11, 19)
                            : ""}
                        </p>
                        <p>
                          <RoomIcon />
                          {ticket.event ? ticket.event.address : ""}
                        </p>
                      </div>
                    </div>
                  );
                }
              })}
            </div>
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

export default connect(mapStateToProps)(Tickets);
