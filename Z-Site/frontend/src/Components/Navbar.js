import React from "react";
import {
  AppBar,
  Toolbar,
  CssBaseline,
  Typography,
  makeStyles,
} from "@material-ui/core";
import { Button } from '@mui/material';
import logo from "../Z-Logo.png"


const useStyles = makeStyles((theme) => ({
    navlinks: {
      marginLeft: theme.spacing(10),
      display: "flex",
    },
   logo: {
      flexGrow: "1",
      background: "linear-gradient(270deg, #EC4899 0%, #FFC6CF 94.76%)",
      justifyContent:"space-between",
    },
    link: {
      textDecoration: "none",
      color: "white",
      fontSize: "20px",
      marginLeft: theme.spacing(20),
      "&:hover": {
        color: "yellow",
        borderBottom: "1px solid white",
        
      },
    },
  }));
  
  function Navbar() {
    const classes = useStyles();
  
    return (
      <AppBar position="static">
        <CssBaseline />
        <Toolbar className={classes.logo}>
          <Typography variant="h4" >
          <img src={logo} cursor="help" height={60} />
          </Typography>
          <Button variant="contained">Connect</Button>
        </Toolbar>
      </AppBar>
    );
  }
  export default Navbar;