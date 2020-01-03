import React, { Component } from "react";
import HomeHeaderLogin from "../component/Home-header-login";
import { connect } from "react-redux";
import { postEvent } from "../_actions/events";
import { getCategories } from "../_actions/categories";
import Footer from "../component/footer";
import "./Pages.css";

class AddEvent extends Component {
  constructor() {
    super();
    this.state = {
      title: "",
      category_id: "",
      image: "",
      startTime: "",
      endTime: "",
      price: "",
      address: "",
      urlmaps: "",
      phone: "",
      description: ""
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
      image: this.state.image,
      startTime: this.state.startTime,
      endTime: this.state.endTime,
      price: this.state.price,
      address: this.state.address,
      urlmaps: this.state.urlmaps,
      phone: this.state.phone,
      description: this.state.description
    };

    this.props.postEvent(event);
    alert("success add event");
  };

  componentDidMount() {
    this.props.getCategories();
  }

  render() {
    const { data } = this.props.categories;
    const { data2 } = this.props.addevent;
    if (data2 != null) {
      alert(data2.message);
    }

    return (
      <div>
        <HomeHeaderLogin />
        <div className="content addevent">
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
            <input
              type="text"
              placeholder="Start Time"
              name="startTime yyyy-dd-mm hh:mm:ss"
              onChange={this.onChange}
            ></input>
            <input
              type="text"
              placeholder="End Time"
              name="endTime yyyy-dd-mm hh:mm:ss"
              onChange={this.onChange}
            ></input>
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
            <input
              type="text"
              placeholder="Deskripsi Event"
              name="description"
              onChange={this.onChange}
            ></input>
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
    addevent: state.addevent
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
