import React, { Component } from "react";
import "./Pages.css";
import { withRouter, Link } from "react-router-dom";
// Import Component
import HomeHeader from "../component/Home-header";
// Import redux
import { connect } from "react-redux";
import { getCategory } from "../_actions/category.js";
//Import material-ui
import Grid from "@material-ui/core/Grid";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import FavoriteIcon from "@material-ui/icons/Favorite";

class CategoryPage extends Component {
  componentDidMount() {
    this.props.getCategory(this.props.category_id);
  }

  render() {
    const { data, isLoading, error } = this.props.category;
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
        <HomeHeader />
        <Grid container style={{ flexGrow: "1" }} className="today-events">
          <Grid item xs={12}>
            <Grid container justify="center">
              {data.map((entry, index) => {
                return (
                  <Grid key={index} item style={{ margin: "10px" }}>
                    <CardContent
                      style={{
                        height: "400px",
                        width: "300px",
                        backgroundColor: "#fff",
                        boxShadow: "2px 1px 4px grey"
                      }}
                    >
                      <Link
                        to={`/event/${entry.id}`}
                        style={{
                          textDecoration: "none",
                          color: "#000",
                          fontFamily: "arial"
                        }}
                      >
                        <CardMedia
                          component="img"
                          width={"100%"}
                          height={"200px"}
                          image={entry.image}
                        ></CardMedia>
                        <h3>{entry.title}</h3>
                      </Link>
                      <FavoriteIcon
                        style={{
                          float: "right",
                          position: "relative",
                          bottom: "40px"
                        }}
                      />
                      <p>{entry.desctiption}</p>
                    </CardContent>
                  </Grid>
                );
              })}
            </Grid>
          </Grid>
        </Grid>
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    category_id: ownProps.match.params.category_id,
    category: state.category
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getCategory: category_id => {
      dispatch(getCategory(category_id));
    }
  };
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(CategoryPage)
);
