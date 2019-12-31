// import React from "react";
// import { makeStyles } from "@material-ui/core/styles";
// import { Link } from "react-router-dom";
// //import Maaterial-Ui
// import AppBar from "@material-ui/core/AppBar";
// import Toolbar from "@material-ui/core/Toolbar";
// import Typography from "@material-ui/core/Typography";
// import Button from "@material-ui/core/Button";
// import AccountCircleIcon from "@material-ui/icons/AccountCircle";

// const useStyles = makeStyles(theme => ({
//   root: {
//     flexGrow: 1
//   },
//   title: {
//     flexGrow: 1
//   }
// }));

// export default function HomeHeaderLogin() {
//   const classes = useStyles();

//   return (
//     <div className={classes.root}>
//       <AppBar position="static" style={{ backgroundColor: "#E6494C" }}>
//         <Toolbar>
//           <Typography variant="h6" className={classes.title}>
//             DUMB-TICK
//           </Typography>
//           <AccountCircleIcon />
//         </Toolbar>
//       </AppBar>
//     </div>
//   );
// }
import React from "react";
import { fade, makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import InputBase from "@material-ui/core/InputBase";
import Badge from "@material-ui/core/Badge";
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";
import MenuIcon from "@material-ui/icons/Menu";
import SearchIcon from "@material-ui/icons/Search";
import AccountCircle from "@material-ui/icons/AccountCircle";

const useStyles = makeStyles(theme => ({
  grow: {
    flexGrow: 1
  }
}));

export default function HomeHeaderLogin() {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);

  const isMenuOpen = Boolean(anchorEl);

  const handleProfileMenuOpen = event => {
    setAnchorEl(event.currentTarget);
  };
  const handleMenuClose = () => {
    setAnchorEl(null);
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
      <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
      <MenuItem onClick={handleMenuClose}>My account</MenuItem>
    </Menu>
  );
  return (
    <div className={classes.grow}>
      <AppBar position="static">
        <Toolbar style={{ display: "flex" }}>
          <IconButton
            edge="end"
            aria-label="account of current user"
            aria-controls={menuId}
            aria-haspopup="true"
            onClick={handleProfileMenuOpen}
            color="inherit"
            style={{ marginLeft: 700 }}
          >
            <AccountCircle />
          </IconButton>
        </Toolbar>
      </AppBar>
      {renderMenu}
    </div>
  );
}
