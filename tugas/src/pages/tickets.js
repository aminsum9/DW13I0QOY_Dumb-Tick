import React, { Component } from "react";
import HomeHeaderLogin from "../component/Home-header-login";
import Footer from "../component/footer";
import axios from "axios";
import "./Pages.css";

class Tickets extends Component {
  constructor(props) {
    super();
    this.state = { tickets: [], profile: [] };
  }

  componentDidMount() {
    if (localStorage.getItem("token")) {
      let token = localStorage.getItem("token");
      axios.defaults.headers["Authentication"] = "Bearer" + token;
      axios
        .get("http://localhost:5000/api/eo/order?status=confirmed")
        .then(res => {
          const tickets = res.data;
          console.log(tickets);
          this.setState({ tickets });
        });
    }
    if (localStorage.getItem("token")) {
      let token = localStorage.getItem("token");
      axios.defaults.headers["Authorization"] = "Bearer " + token;
      axios.get(`http://localhost:5000/api/eo/profile`).then(res => {
        const profile = res.data;
        console.log(res.data);
        this.setState({ profile });
      });
    }
  }

  render() {
    return (
      <div className="container">
        <HomeHeaderLogin />
        <div className="content tickets">
          <div className="tickets-contain">
            {this.state.tickets.map((ticket, index) => {
              return (
                <div key={index} className="ticket">
                  <div
                    style={{
                      background: "lightgrey",
                      padding: "10px"
                    }}
                  >
                    <h1>{this.state.profile.name}</h1>
                    <h3
                      style={{
                        position: "relative",
                        left: "90%",
                        top: "-60px",
                        width: "200px"
                      }}
                    >
                      {"Rp. " + ticket.totalPrice}
                    </h3>
                  </div>
                  <h1>{ticket.event ? ticket.event.title : ""}</h1>
                  <p>{ticket.event ? ticket.event.startTime : ""}</p>
                  <p>{ticket.event ? ticket.event.address : ""}</p>
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

export default Tickets;

// import React, { Component } from "react";
// //Import Component
// import HomeHeaderLogin from "../component/Home-header-login";
// import axios from "axios";
// import "./Pages.css";

// class Profile extends Component {
//   constructor(props) {
//     super();
//     this.state = { profile: [] };
//   }

//   componentDidMount() {
//     if (localStorage.getItem("token")) {
//       let token = localStorage.getItem("token");
//       axios.defaults.headers["Authorization"] = "Bearer " + token;
//       axios.get(`http://localhost:5000/api/eo/profile`).then(res => {
//         const profile = res.data;
//         console.log(res.data);
//         this.setState({ profile });
//       });
//     }
//   }

//   render() {
//     return (
//       <div className="container">
//         <HomeHeaderLogin />
//         <div className="content">
//           <div className="profile-title">
//             <h1 id="title">Profile</h1>
//           </div>
//           <div className="profile-data">
//             <div className="data-profile">
//               <h1>{this.state.profile.name}</h1>
//               <p id="profile-phone">{this.state.profile.phone}</p>
//               <p id="profile-phone">{this.state.profile.email}</p>
//             </div>
//             <div className="image-profile">
//               <img src={this.state.profile.image}></img>
//             </div>
//           </div>
//         </div>
//         <footer></footer>
//       </div>
//     );
//   }
// }

// export default Profile;
