import React, { Component } from "react";
import { withRouter } from "react-router-dom";
// Import Redux
import { connect } from "react-redux";
import { getDetailEvent } from "../_actions/detailEvent";
// Import Component
import HomeHeader from "../component/Home-header";
//Import material-ui
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

    return (
      <div>
        <HomeHeader />
        <Card
          style={{
            width: "1000px",
            height: "700px",
            margin: "auto",
            marginTop: "50px",
            marginBottom: "200px"
          }}
        >
          <CardActionArea>
            <img
              src={data.image}
              style={{ width: "100%", height: "500px" }}
            ></img>
            <CardContent>
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
              <Typography variant="body2" color="textSecondary" component="p">
                {data.desctiption}
              </Typography>
            </CardContent>
          </CardActionArea>
        </Card>
      </div>
    );
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
