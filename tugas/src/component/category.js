import React, { Component } from "react";
import { connect } from "react-redux";
import { getCategories } from "../_actions/categories";

class Category extends Component {
  componentDidMount() {
    this.props.getCategories(); //Fire ACT Pending
  }

  render() {
    const { data, isLoading, error } = this.props.categories;

    console.log(data);

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

const mapDispatchToProps = dispatch => {
  return {
    getCategories: () => {
      dispatch(getCategories());
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Category);
