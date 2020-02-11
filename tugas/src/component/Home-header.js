import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Link } from "react-router-dom";
//import Maaterial-Ui
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
// -----
import axios from "axios";
import IconButton from "@material-ui/core/IconButton";
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";
import Avatar from "@material-ui/core/Avatar";

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1
  },
  title: {
    flexGrow: 1
  }
}));

export default function HomeHeader(props) {
  const classes = useStyles();
  // ---------
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [data, setData] = React.useState("data");

  const isMenuOpen = Boolean(anchorEl);

  const handleProfileMenuOpen = event => {
    setAnchorEl(event.currentTarget);
  };
  const handleMenuClose = () => {
    setAnchorEl(null);
  };
  const handleMenuCloseLoguot = () => {
    localStorage.clear("token");
    window.location.assign("/");
  };
  const menuId = "primary-search-account-menu";
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
      id={menuId}
      keepMounted
      transformOrigin={{ vertical: "top", horizontal: "right" }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <Link to="/Profile" style={{ textDecoration: "none", color: "#000" }}>
        <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
      </Link>
      <Link to="/Tickets" style={{ textDecoration: "none", color: "#000" }}>
        <MenuItem onClick={handleMenuClose}>My Ticket</MenuItem>
      </Link>
      <Link to="/Payment" style={{ textDecoration: "none", color: "#000" }}>
        <MenuItem onClick={handleMenuClose}>Payment</MenuItem>
      </Link>
      <Link to="Addevent" style={{ textDecoration: "none", color: "#000" }}>
        <MenuItem onClick={handleMenuClose}>Add Event</MenuItem>
      </Link>
      <MenuItem onClick={handleMenuCloseLoguot}>Log out</MenuItem>
    </Menu>
  );
  if (localStorage.getItem("token") != null) {
    return (
      <div>
        <AppBar position="static" style={{ background: "#E6494C" }}>
          <Toolbar style={{ display: "flex" }}>
            <div style={{ width: "100%", display: "flex" }}>
              <div style={{ width: "80%" }}>
                <Link
                  to="/Home"
                  style={{ textDecoration: "none", color: "#fff" }}
                >
                  <Typography variant="h6" style={{ lineHeight: "60px" }}>
                    DUMB-TICK
                  </Typography>
                </Link>
              </div>
              <div>
                <p style={{ fontSize: "20px", marginLeft: "50px" }}>
                  {props.name}
                </p>
              </div>
              <IconButton
                edge="end"
                aria-label="account of current user"
                aria-controls={menuId}
                aria-haspopup="true"
                onClick={handleProfileMenuOpen}
                color="inherit"
                style={{ margin: "auto" }}
              >
                <Avatar alt="Remy Sharp" src={props.profile} />
              </IconButton>
            </div>
          </Toolbar>
        </AppBar>
        {renderMenu}
      </div>
    );
  } else {
    return (
      <div className={classes.root}>
        <AppBar position="static" style={{ backgroundColor: "#E6494C" }}>
          <Toolbar style={{ width: "100%" }}>
            <div style={{ width: "60%" }}>
              <Link
                to="/Home"
                style={{ textDecoration: "none", color: "#fff" }}
              >
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
}

// --------

// export default function HomeHeaderLogin(props) {

// ------------------
// useEffect(() => {
//   const fetchData = async () => {
//     const result = await axios("http://localhost:5000/api/eo/profile");
//     setData(result.data);
//   };
//   fetchData();
// }, []);
// -------------------

// }
