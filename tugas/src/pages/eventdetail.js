import React, { Component } from "react";
import { withRouter } from "react-router-dom";
// Import Redux
import { connect } from "react-redux";
import { getDetailEvent } from "../_actions/detailEvent";
// Import Component
import HomeHeaderLogin from "../component/Home-header-login";
import HomeHeader from "../component/Home-header";
import Footer from "../component/footer";
//Import material-ui
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";

class EventDetail extends Component {
  componentDidMount() {
    this.props.getDetailEvent(this.props.event_id);
  }

  render() {
    const { data, isLoading, error } = this.props.detailevent;
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

    if (localStorage.getItem("token") != null) {
      return (
        <div>
          <HomeHeaderLogin />
          <Card
            style={{
              width: "1000px",
              margin: "auto",
              marginTop: "50px",
              marginBottom: "200px"
            }}
          >
            <img
              src={data.image}
              style={{ width: "100%", height: "500px" }}
            ></img>
            <div
              style={{ display: "flex", flexDirection: "row", padding: "20px" }}
            >
              <Typography
                gutterBottom
                variant="h5"
                component="h2"
                style={{ width: "85%" }}
              >
                {data.title}
              </Typography>
              <div style={{ margin: "auto", fontSize: "20px" }}>
                {"Rp. " + data.price}
              </div>
            </div>
            <h3 style={{ marginLeft: "2%" }}>
              {data.category ? data.category.name : ""}
            </h3>
            <Button
              variant="contained"
              color="secondary"
              className="button-buy"
              style={{ marginBottom: "20px" }}
            >
              BUY
            </Button>
            <hr style={{ width: "98%", margin: "auto" }}></hr>
            <div
              style={{
                height: "200px",
                display: "flex",
                flexDirection: "row",
                justifyContent: "center",
                marginBottom: "50px"
              }}
            >
              <div
                style={{
                  width: "33%",
                  height: "100%",
                  paddingLeft: "20px"
                }}
              >
                <h1>Hosted By</h1>
                <div
                  style={{
                    width: "100%",
                    display: "flex",
                    flexDirection: "row"
                  }}
                >
                  <img
                    src={data.createdBy ? data.createdBy.image : ""}
                    style={{ width: "100px", height: "100px" }}
                  ></img>
                  <p style={{ fontSize: "20px", marginLeft: "10px" }}>
                    {data.createdBy ? data.createdBy.name : ""}
                  </p>
                </div>
              </div>
              <div
                style={{
                  width: "33%",
                  height: "100%"
                }}
              >
                <h1>Date & Time</h1>
                <p>
                  {data.startTime} - {data.endTime}
                </p>
              </div>
              <div style={{ width: "33%", height: "100%" }}>
                <h1>Contact Person</h1>
                <p>{data.createdBy ? data.createdBy.name : ""}</p>
                <p>{data.createdBy ? data.createdBy.phone : ""}</p>
                <p>{data.createdBy ? data.createdBy.email : ""}</p>
              </div>
            </div>
          </Card>
          <Footer />
        </div>
      );
    } else {
      return (
        <div>
          <HomeHeader />
          <Card
            style={{
              width: "1000px",
              margin: "auto",
              marginTop: "50px",
              marginBottom: "200px"
            }}
          >
            <img
              src={data.image}
              style={{ width: "100%", height: "500px" }}
            ></img>
            <div style={{ display: "flex", flexDirection: "row" }}>
              <Typography
                gutterBottom
                variant="h5"
                component="h2"
                style={{ width: "85%" }}
              >
                {data.title}
              </Typography>
              <div style={{ margin: "auto" }}>
                <Button variant="contained" color="secondary">
                  {"Rp. " + data.price}
                </Button>
              </div>
            </div>
            <h3>{data.category ? data.category.name : ""}</h3>
            <Button
              variant="contained"
              color="secondary"
              className="button-buy"
              style={{ marginBottom: "20px" }}
            >
              BUY
            </Button>
            <hr style={{ width: "98%", margin: "auto" }}></hr>
            <div
              style={{
                height: "200px",
                display: "flex",
                flexDirection: "row",
                justifyContent: "center",
                marginBottom: "50px"
              }}
            >
              <div
                style={{
                  width: "33%",
                  height: "100%",
                  paddingLeft: "20px"
                }}
              >
                <h1>Hosted By</h1>
                <div
                  style={{
                    width: "100%",
                    display: "flex",
                    flexDirection: "row"
                  }}
                >
                  <img
                    src={data.createdBy ? data.createdBy.image : ""}
                    style={{ width: "100px", height: "100px" }}
                  ></img>
                  <p style={{ fontSize: "20px", marginLeft: "10px" }}>
                    {data.createdBy ? data.createdBy.name : ""}
                  </p>
                </div>
              </div>
              <div
                style={{
                  width: "33%",
                  height: "100%"
                }}
              >
                <h1>Date & Time</h1>
                <p>
                  {data.startTime} - {data.endTime}
                </p>
              </div>
              <div style={{ width: "33%", height: "100%" }}>
                <h1>Contact Person</h1>
                <p>{data.createdBy ? data.createdBy.name : ""}</p>
                <p>{data.createdBy ? data.createdBy.phone : ""}</p>
                <p>{data.createdBy ? data.createdBy.email : ""}</p>
              </div>
            </div>
          </Card>
          <Footer />
        </div>
      );
    }
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    event_id: ownProps.match.params.event_id,
    detailevent: state.detailevent
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getDetailEvent: event_id => {
      dispatch(getDetailEvent(event_id));
    }
  };
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(EventDetail)
);
