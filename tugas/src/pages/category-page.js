import React, { Component } from "react";
import "./Pages.css";
import { withRouter, Link } from "react-router-dom";
// Import Component
import HomeHeader from "../component/Home-header";
import Footer from "../component/footer";
// Import Function
import { favorite } from "../config/api";
// Import redux
import { connect } from "react-redux";
import { getCategory } from "../_actions/category.js";
import { getProfile, getFavorites } from "../_actions/profile";
//Import material-ui
import Grid from "@material-ui/core/Grid";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import FavoriteIcon from "@material-ui/icons/Favorite";

class CategoryPage extends Component {
  constructor() {
    super();
    this.state = {
      profile: []
    };
  }

  Favorite = event_id => user_id => {
    const data = {
      user_id: user_id,
      event_id: event_id
    };
    favorite(data).then(data => alert(data.data.message));
  };

  componentDidMount() {
    this.props.getCategory(this.props.category_id);
    this.props.getProfile();
    this.props.getFavorites();
  }

  render() {
    const token = localStorage.getItem("token");
    const { data, isLoading, error } = this.props.category;
    const { profile } = this.props.profile;
    const { favorites } = this.props.favorites;
    console.log(favorites);
    if (error) {
      return (
        <div>
          <h1>Error</h1>
        </div>
      );
    }
    console.log(data.category);
    if (isLoading) {
      return (
        <div>
          {token != null && (
            <HomeHeader profile={profile.image} name={profile.name} />
          )}
          {token == null && <HomeHeader />}
          <h1 className="is-loading">Loading....</h1>
        </div>
      );
    }

    return (
      <div>
        {token != null && (
          <HomeHeader profile={profile.image} name={profile.name} />
        )}
        {token == null && <HomeHeader />}
        <div>
          {data.slice(0, 1).map(item => (
            <h1
              style={{
                marginLeft: "50px",
                color: "#e6494c",
                textTransform: "uppercase"
              }}
            >
              {item.category.name}
            </h1>
          ))}
        </div>
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
                      {token != null && (
                        <FavoriteIcon
                          style={{
                            float: "right",
                            position: "relative",
                            bottom: "40px"
                          }}
                          // onClick={this.triggerAddTripState}
                          onClick={() => this.Favorite(entry.id)(profile.id)}
                        />
                      )}
                      <p>{entry.description.slice(0, 100) + "..."}</p>
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

const mapStateToProps = (state, ownProps) => {
  return {
    category_id: ownProps.match.params.category_id,
    category: state.category,
    profile: state.profile,
    favorites: state.favorites
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getCategory: category_id => {
      dispatch(getCategory(category_id));
    },
    getProfile: () => {
      dispatch(getProfile());
    },
    getFavorites: () => {
      dispatch(getFavorites());
    }
  };
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(CategoryPage)
);
