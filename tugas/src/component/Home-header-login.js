import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";
import Avatar from "@material-ui/core/Avatar";

export default function HomeHeaderLogin() {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [data, setData] = React.useState("data");

  const isMenuOpen = Boolean(anchorEl);

  const handleProfileMenuOpen = event => {
    setAnchorEl(event.currentTarget);
  };
  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  // ------------------
  useEffect(() => {
    const fetchData = async () => {
      const result = await axios("http://localhost:5000/api/eo/profile");
      setData(result.data);
    };
    fetchData();
  }, []);
  // -------------------

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
  return (
    <div>
      <AppBar position="static" style={{ background: "#E6494C" }}>
        <Toolbar style={{ display: "flex" }}>
          <div style={{ width: "100%", display: "flex" }}>
            <div style={{ width: "95%" }}>
              <Link
                to="/Home"
                style={{ textDecoration: "none", color: "#fff" }}
              >
                <Typography variant="h6" style={{ lineHeight: "60px" }}>
                  DUMB-TICK
                </Typography>
              </Link>
            </div>
            <p style={{ fontSize: "20px", marginRight: "10px" }}>{data.name}</p>
            <IconButton
              edge="end"
              aria-label="account of current user"
              aria-controls={menuId}
              aria-haspopup="true"
              onClick={handleProfileMenuOpen}
              color="inherit"
              style={{ margin: "auto" }}
            >
              <Avatar alt="Remy Sharp" src={data.image} />
            </IconButton>
          </div>
        </Toolbar>
      </AppBar>
      {renderMenu}
    </div>
  );
}
