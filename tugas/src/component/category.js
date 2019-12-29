import React, { Component } from "react";
import { connect } from "react-redux";
import { getCategories, getCategoriesPending } from "../_actions/categories";
import axios from "axios";

class category extends Component {
  componentDidMount() {
    this.props.dispatch(getCategoriesPending()); //Fire ACT Pending
    axios.get("http://localhost:5000/api/eo/categories").then(res => {
      this.props.dispatch(getCategories(res.data)); //Fire ACT FULLFILED
    });
  }

  render() {
    const { data, isLoading, error } = this.props.categories;
    console.log(this.props.categories);

    if (error) {
      return (
        <div>
          <h1>Error</h1>
        </div>
      );
    }

    if (isLoading) {
      return (
        <div>
          <h1>Loading....</h1>
        </div>
      );
    }

    return (
      <div>
        {data.map((entry, index) => {
          return <p key={index}>{entry.name}</p>;
        })}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    categories: state.categories
  };
};

export default connect(mapStateToProps)(category);
