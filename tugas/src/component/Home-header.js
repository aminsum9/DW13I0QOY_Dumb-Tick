import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Link } from "react-router-dom";
//import Maaterial-Ui
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1
  },
  title: {
    flexGrow: 1
  }
}));

export default function HomeHeader() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <AppBar position="static" style={{ backgroundColor: "#E6494C" }}>
        <Toolbar style={{ width: "100%" }}>
          <div style={{ width: "60%" }}>
            <Link to="/Home" style={{ textDecoration: "none", color: "#fff" }}>
              <Typography variant="h6" className={classes.title}>
                DUMB-TICK
              </Typography>
            </Link>
          </div>
          <div
            style={{
              width: "40%",
              display: "flex",
              justifyContent: "center"
            }}
          >
            <Link
              to={"/Register"}
              style={{
                color: "#fff",
                fontWeight: "bold",
                textDecoration: "none"
              }}
            >
              <Button color="inherit">Register</Button>
            </Link>
            <Link
              to={"/Login"}
              style={{
                color: "#fff",
                fontWeight: "bold",
                textDecoration: "none"
              }}
            >
              <Button color="inherit">Login</Button>
            </Link>
          </div>
        </Toolbar>
      </AppBar>
    </div>
  );
}
