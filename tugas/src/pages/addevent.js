import React, { Component } from "react";
import HomeHeader from "../component/Home-header";
import { connect } from "react-redux";
import { postEvent } from "../_actions/events";
import { getCategories } from "../_actions/categories";
import Footer from "../component/footer";
import TextField from "@material-ui/core/TextField";
import "./Pages.css";

class AddEvent extends Component {
  constructor() {
    super();
    this.state = {
      title: "",
      category_id: "",
      image: "",
      startDate: "",
      startTime: "",
      endDate: "",
      endTime: "",
      price: "",
      address: "",
      urlmaps: "",
      phone: "",
      description: "",
      responseAddData: ""
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }
  onSubmit = () => {
    const event = {
      title: this.state.title,
      category_id: this.state.category_id,
      user_id: 1,
      image: this.state.image,
      startTime: this.state.startDate + " " + this.state.startTime,
      endTime: this.state.endDate + " " + this.state.endTime,
      price: this.state.price,
      address: this.state.address,
      urlmaps: this.state.urlmaps,
      phone: this.state.phone,
      description: this.state.description
    };
    console.log(event);
    this.props.postEvent(event);
    const { addevent } = this.props.addevent;
    window.setTimeout(this.getAddevent, 1000);
  };

  getAddevent = () => {
    const { addevent } = this.props.addevent;
    if (addevent != null) {
      alert(addevent.message);
      window.location = "/Addevent";
    }
  };

  componentDidMount() {
    this.props.getCategories();
  }

  render() {
    const { data } = this.props.categories;
    const { profile } = this.props.profile;

    return (
      <div>
        <HomeHeader profile={profile.image} name={profile.name} />
        <div className="content addevent addback">
          <form onSubmit={this.onSubmit}>
            <h1 id="addevent-title">Add Event</h1>
            <input
              type="text"
              placeholder="Event Title"
              name="title"
              onChange={this.onChange}
            ></input>
            <select
              placeholder="category"
              onChange={this.onChange}
              name="category_id"
            >
              <option>please select one..</option>;
              {data.map((entry, index) => {
                return (
                  <option key={index} value={entry.id}>
                    {entry.name}
                  </option>
                );
              })}
            </select>
            <input
              type="text"
              placeholder="Upload Pamflet"
              name="image"
              onChange={this.onChange}
            ></input>
            <div
              style={{ width: "100%", display: "flex", flexDirection: "row" }}
            >
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  width: "50%"
                }}
              >
                <label style={{ color: "#fff", fontSize: 20 }}>
                  Start Date
                </label>
                <input
                  type="date"
                  name="startDate"
                  style={{ width: "90%" }}
                  onChange={this.onChange}
                ></input>
              </div>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  width: "50%"
                }}
              >
                <label style={{ color: "#fff", fontSize: 20 }}>
                  Start Time
                </label>
                <input
                  type="time"
                  name="startTime"
                  onChange={this.onChange}
                  style={{ width: "100%" }}
                ></input>
              </div>
            </div>
            <div
              style={{ width: "100%", display: "flex", flexDirection: "row" }}
            >
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  width: "50%"
                }}
              >
                <label style={{ color: "#fff", fontSize: 20 }}>End Date</label>
                <input
                  type="date"
                  name="endDate"
                  style={{ width: "90%" }}
                  onChange={this.onChange}
                ></input>
              </div>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  width: "50%"
                }}
              >
                <label style={{ color: "#fff", fontSize: 20 }}>End Time</label>
                <input
                  type="time"
                  name="endTime"
                  onChange={this.onChange}
                  style={{ width: "100%" }}
                ></input>
              </div>
            </div>
            <input
              type="text"
              placeholder="Price"
              name="price"
              onChange={this.onChange}
            ></input>
            <input
              type="text"
              placeholder="Address Event"
              name="address"
              onChange={this.onChange}
            ></input>
            <input
              type="text"
              placeholder="Url Maps"
              name="urlmaps"
              onChange={this.onChange}
            ></input>
            <input
              type="text"
              placeholder="Telp"
              name="phone"
              onChange={this.onChange}
            ></input>
            {/* <input
              type="text"
              placeholder="Email EO"
              name="email"
              onChange={this.onChange}
            ></input> */}
            <label style={{ color: "#fff", fontSize: 20, fontSize: 23 }}>
              Deskripsi Event
            </label>
            <textarea
              id="addevent-description"
              type="text"
              // placeholder="Deskripsi Event"
              name="description"
              onChange={this.onChange}
            ></textarea>
            <button type="button" onClick={this.onSubmit}>
              Publish
            </button>
          </form>
        </div>
        <Footer />
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    categories: state.categories,
    addevent: state.addevent,
    profile: state.profile
  };
};

const mapDispatchToProps = dispatch => {
  return {
    postEvent: event => {
      console.log(event);
      dispatch(postEvent(event));
    },
    getCategories: () => {
      dispatch(getCategories());
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AddEvent);
