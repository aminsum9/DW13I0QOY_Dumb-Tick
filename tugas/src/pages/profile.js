import React, { Component } from "react";
import { Link } from "react-router-dom";
//Import Component
import HomeHeaderLogin from "../component/Home-header-login";
import axios from "axios";
import Footer from "../component/footer";
import "./Pages.css";
// Import Redux
import { connect } from "react-redux";
import { getProfile } from "../_actions/profile";
import { getFavorites } from "../_actions/profile";
//Import Material-UI
import Button from "@material-ui/core/Button";
import FavoriteIcon from "@material-ui/icons/Favorite";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Grid from "@material-ui/core/Grid";

class Profile extends Component {
  constructor(props) {
    super();
    this.state = { profile: [] };
  }
  componentDidMount() {
    this.props.getProfile();
    this.props.getFavorites();
  }

  render() {
    const { profile } = this.props.profile;
    const { favorites } = this.props.favorites;
    console.log(favorites);
    return (
      <div className="container">
        <HomeHeaderLogin profile={profile.image} />
        <div className="content">
          <Link to="/edit-profile" style={{ textDecoration: "none" }}>
            <Button
              variant="contained"
              color="secondary"
              id="edit-profile-button"
            >
              Edit Profile
            </Button>
          </Link>
          <div className="profile-title">
            <h1 id="title">Profile</h1>
          </div>
          <div className="profile-data">
            <div className="data-profile">
              <h1>{profile.name}</h1>
              <p id="profile-phone">{profile.phone}</p>
              <p id="profile-phone">{profile.email}</p>
            </div>
            <div className="image-profile">
              <img src={profile.image}></img>
            </div>
          </div>
          <div className="favorites">
            <Grid
              container
              style={{ flexGrow: "1", marginBottom: "100px" }}
              className="today-events"
            >
              <Grid item xs={12}>
                <h1 id="title-favorites">Favorites</h1>
                <Grid container justify="center">
                  {favorites.map((entry, index) => {
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
                            // to={`/event/${entry.id}`}
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
                              image={entry.event ? entry.event.image : ""}
                            ></CardMedia>
                            <h3>{entry.event ? entry.event.title : ""}</h3>
                          </Link>
                          <p>
                            {entry.event
                              ? entry.event.description.slice(0, 100) + "..."
                              : ""}
                          </p>
                        </CardContent>
                      </Grid>
                    );
                  })}
                </Grid>
              </Grid>
            </Grid>
          </div>
        </div>
        <Footer />
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    profile: state.profile,
    favorites: state.favorites
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getFavorites: () => {
      dispatch(getFavorites());
    },
    getProfile: () => {
      dispatch(getProfile());
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
