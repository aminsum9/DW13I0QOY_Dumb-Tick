import React, { Component } from "react";
import HomeHeaderLogin from "../component/Home-header-login";
import { connect } from "react-redux";
import { getCategories } from "../_actions/categories";
import Footer from "../component/footer";
import "./Pages.css";

class AddEvent extends Component {
  componentDidMount() {
    this.props.getCategories();
  }

  render() {
    const { data } = this.props.categories;
    return (
      <div>
        <HomeHeaderLogin />
        <div className="content addevent">
          <form>
            <input type="text"></input>
            <select>
              {data.map((entry, index) => {
                return <option>{entry.name}</option>;
              })}
            </select>
            <input type="text"></input>
            <input type="text"></input>
            <input type="text"></input>
            <input type="text"></input>
            <input type="text"></input>
          </form>
        </div>
        <Footer />
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    categories: state.categories
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getCategories: () => {
      dispatch(getCategories());
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AddEvent);
