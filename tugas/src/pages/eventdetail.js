import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import axios from "axios";
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
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";

class EventDetail extends Component {
  constructor() {
    super();
    this.state = {
      quantity: 0,
      status: "pending",
      attachment: "",
      buyer_id: ""
    };
  }

  componentDidMount() {
    this.props.getDetailEvent(this.props.event_id);
    if (localStorage.getItem("token")) {
      let token = localStorage.getItem("token");
      axios.defaults.headers["Authorization"] = "Bearer " + token;
      axios.get(`http://localhost:5000/api/eo/profile`).then(res => {
        const profile = res.data.id;
        console.log(res.data.id);
        this.setState({ buyer_id: profile });
      });
    }
  }

  reduceQuantity = () => {
    if (this.state.quantity !== 0) {
      this.setState({ quantity: this.state.quantity - 1 });
    }
  };

  buyTicket = dataId => dataTitle => {
    return axios
      .post(`http://localhost:5000/api/eo/event/${dataId}/order`, {
        quantity: this.state.quantity,
        status: this.state.status,
        attachment: this.state.attachment,
        buyer_id: this.state.buyer_id
      })
      .then(response => {
        alert(`success order ticket ${dataTitle}`);
      });
  };

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
              marginBottom: "10px"
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
              onClick={this.reduceQuantity}
            >
              -
            </Button>
            <Button className="sum-result">{this.state.quantity}</Button>
            <Button
              variant="contained"
              color="secondary"
              className="button-buy"
              style={{ marginBottom: "20px" }}
              onClick={() =>
                this.setState({ quantity: this.state.quantity + 1 })
              }
            >
              +
            </Button>
            <Button
              variant="contained"
              color="secondary"
              className="button-buy"
              style={{ marginBottom: "20px", marginLeft: "10px" }}
              onClick={() => this.buyTicket(data.id)(data.title)}
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
                <h1 className="event-detail-detail">Hosted By</h1>
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
                <h1 className="event-detail-detail">Date & Time</h1>
                <p>
                  {data.startTime} - {data.endTime}
                </p>
              </div>
              <div style={{ width: "33%", height: "100%" }}>
                <h1 className="event-detail-detail">Contact Person</h1>
                <p>{data.createdBy ? data.createdBy.name : ""}</p>
                <p>{data.createdBy ? data.createdBy.phone : ""}</p>
                <p>{data.createdBy ? data.createdBy.email : ""}</p>
              </div>
            </div>
          </Card>
          {/* -------------- */}
          <Grid
            container
            style={{ flexGrow: "1" }}
            className=" event-detail-bottom"
          >
            <Grid item xs={12}>
              <Grid container justify="center">
                <Grid
                  item
                  style={{
                    marginTop: "10px",
                    minWidth: "500px",
                    borderRadius: "10px",
                    borderRight: "1px solid grey"
                  }}
                >
                  <CardContent
                    style={{
                      // textAlign: "center",
                      backgroundColor: "#fff",
                      boxShadow: "2px 1px 4px grey",
                      fontFamily: "verdana",
                      paddingLeft: "10px",
                      paddingRight: "10px",
                      maxWidth: "500px"
                    }}
                  >
                    <h3>Description</h3>
                    <p>{data.description}</p>
                  </CardContent>
                </Grid>
                <Grid
                  item
                  style={{
                    marginTop: "10px",
                    minWidth: "500px",
                    borderRadius: "10px"
                  }}
                >
                  <CardContent
                    style={{
                      textAlign: "center",
                      backgroundColor: "#fff",
                      boxShadow: "2px 1px 4px grey",
                      fontSize: "20px",
                      fontFamily: "verdana",
                      color: "#fff",
                      paddingLeft: "30px",
                      paddingRight: "30px",
                      height: "20px",
                      maxWidth: "500px"
                    }}
                  ></CardContent>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
          {/* -------------------- */}
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
              marginBottom: "10px"
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
                style={{ width: "85%", marginLeft: "20px" }}
              >
                {data.title}
              </Typography>
              <div style={{ margin: "auto" }}>
                <Button variant="contained" color="secondary">
                  {"Rp. " + data.price}
                </Button>
              </div>
            </div>
            <h3 style={{ marginLeft: "20px" }}>
              {data.category ? data.category.name : ""}
            </h3>
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
                <h1 className="event-detail-detail">Hosted By</h1>
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
                <h1 className="event-detail-detail">Date & Time</h1>
                <p>
                  {data.startTime} - {data.endTime}
                </p>
              </div>
              <div style={{ width: "33%", height: "100%" }}>
                <h1 className="event-detail-detail">Contact Person</h1>
                <p>{data.createdBy ? data.createdBy.name : ""}</p>
                <p>{data.createdBy ? data.createdBy.phone : ""}</p>
                <p>{data.createdBy ? data.createdBy.email : ""}</p>
              </div>
            </div>
          </Card>
          <Card className="event-detail-bottom"></Card>
          {/* --------------------------- */}
          <Grid
            container
            style={{ flexGrow: "1" }}
            className=" event-detail-bottom"
          >
            <Grid item xs={12}>
              <Grid container justify="center">
                <Grid
                  item
                  style={{
                    marginTop: "10px",
                    minWidth: "500px",
                    borderRadius: "10px",
                    borderRight: "1px solid grey"
                  }}
                >
                  <CardContent
                    style={{
                      // textAlign: "center",
                      backgroundColor: "#fff",
                      boxShadow: "2px 1px 4px grey",
                      fontFamily: "verdana",
                      paddingLeft: "10px",
                      paddingRight: "10px",
                      maxWidth: "500px"
                    }}
                  >
                    <h3>Description</h3>
                    <p>{data.description}</p>
                  </CardContent>
                </Grid>
                <Grid
                  item
                  style={{
                    marginTop: "10px",
                    minWidth: "500px",
                    borderRadius: "10px"
                  }}
                >
                  <CardContent
                    style={{
                      textAlign: "center",
                      backgroundColor: "#fff",
                      boxShadow: "2px 1px 4px grey",
                      fontSize: "20px",
                      fontFamily: "verdana",
                      color: "#fff",
                      paddingLeft: "30px",
                      paddingRight: "30px",
                      height: "20px",
                      maxWidth: "500px"
                    }}
                  ></CardContent>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
          {/* ----------------------- */}
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
