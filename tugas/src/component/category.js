import React, { Component } from "react";
import "./Component.css";
import { connect } from "react-redux";
import { getCategories } from "../_actions/categories";
import { getEvents } from "../_actions/events";
import { Link } from "react-router-dom";
//material-ui event
import FavoriteIcon from "@material-ui/icons/Favorite";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Grid from "@material-ui/core/Grid";
//import component
import Footer from "./footer";

class Category extends Component {
  componentDidMount() {
    this.props.getCategories(); //Fire ACT Pending
    this.props.getEvents();
  }

  render() {
    const { data, isLoading, error } = this.props.categories;
    const { events } = this.props.events;
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
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            marginTop: "40px"
          }}
        >
          <h1 style={{ fontSize: "35px" }}>Category</h1>
        </div>
        <Grid container style={{ flexGrow: "1" }} className="today-events">
          <Grid item xs={12}>
            <Grid container justify="center">
              {data.map((entry, index) => {
                return (
                  <Grid key={index} item style={{ margin: "10px" }}>
                    <Link
                      to={"/category/" + entry.id + "/events"}
                      style={{
                        textDecoration: "none",
                        color: "#000"
                      }}
                    >
                      <CardContent
                        style={{
                          textAlign: "center",
                          borderRadius: "20px",
                          backgroundColor: "rgb(218, 96, 96)",
                          boxShadow: "2px 1px 4px grey",
                          fontSize: "20px",
                          fontFamily: "verdana",
                          color: "#fff",
                          textTransform: "uppercase",
                          paddingLeft: "30px",
                          paddingRight: "30px",
                          height: "20px"
                        }}
                      >
                        {entry.name}
                      </CardContent>
                    </Link>
                  </Grid>
                );
              })}
            </Grid>
          </Grid>
        </Grid>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            marginTop: "40px"
          }}
        >
          <h1>Today Event</h1>
        </div>
        <Grid
          container
          style={{ flexGrow: "1", marginBottom: "100px" }}
          className="today-events"
        >
          <Grid item xs={12}>
            <Grid container justify="center">
              {events.map((entry, index) => {
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
        <Footer />
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    categories: state.categories,
    events: state.events
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getCategories: () => {
      dispatch(getCategories());
    },
    getEvents: () => {
      dispatch(getEvents());
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Category);
