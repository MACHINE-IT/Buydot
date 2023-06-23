import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { Avatar, Button, Stack } from "@mui/material";
import Box from "@mui/material/Box";
import React, { useState, useEffect } from "react";
import { useHistory, Link } from "react-router-dom";
import "./Header.css";

const Header = ({ children, hasHiddenAuthButtons }) => {
  const history = useHistory();

  const [userLoggedIn, setUserLoggedIn] = useState(false);

  const onBackClickHandler = () => {
    history.push("/");
  };

  const loginButtonHandler = () => {
    history.push("/login");
  }

  const registerButtonHandler = () => {
    history.push("/register");
  }

  const logoutButtonHandler = () => {
    localStorage.clear();
    setUserLoggedIn(false);
    history.push("/login");
    // window.location.reload();
  }

  useEffect(() => {
    // const userInfo = JSON.parse(localStorage.getItem("userInfo"));
    // if (userInfo && userInfo.token) {
    //   setUserLoggedIn(true);
    //   // console.log("user token is: " + userInfo.token);
    // }

    const username = localStorage.getItem("username");
    if (username) { 
      setUserLoggedIn(true);
      // console.log("user token is: " + userInfo.token);
    }
    
  }, []);
 // const userInfo = JSON.parse(localStorage.getItem("userInfo"));
 const username = localStorage.getItem("username");
  // console.log("user token is: " + userInfo?.token);
  // console.log("user is logged in is set to: " + userLoggedIn);

  const headerForUserLoggedIn = () => {
    return (
      <Box className="header custom-header" justifyContent="space-between">
        <Box className="header-title">
          <img src="logo_light.svg" alt="QKart-icon"></img>
        </Box>
        <Stack direction="row" spacing={2} alignItems="center">
          {/* <Avatar src="/broken-image.jpg" alt={userInfo.username}/>
          <p className="username-text">{userInfo.username.charAt(0).toUpperCase() + userInfo.username.slice(1)}</p>
          <Button variant="text" className="button" onClick={logoutButtonHandler}>LOGOUT</Button> */}
           <Avatar src="/broken-image.jpg" alt={username}/>
          <p className="username-text">{username.charAt(0).toUpperCase() + username.slice(1)}</p>
          <Button variant="text" className="button" onClick={logoutButtonHandler}>LOGOUT</Button>
        
        </Stack>
      </Box>
    );
  };

  const headerForUserLoggedOut = () => {
    return (
      <Box className="header custom-header">
        <Box className="header-title">
          <img src="logo_light.svg" alt="QKart-icon"></img>
        </Box>
        <Box sx={{ display: "flex", justifyContent: "flex-end", alignItems: "flex-end" }}>
          <Stack direction="row" spacing={2}>
          <Button variant="text" onClick={loginButtonHandler}>LOGIN</Button>
          <Button variant="contained" onClick={registerButtonHandler}>REGISTER</Button>
          </Stack>
        </Box>
      </Box>
    );
  };

  if (hasHiddenAuthButtons) {
    return (
      <Box className="header custom-header">
        <Box className="header-title">
          <img src="logo_light.svg" alt="QKart-icon"></img>
        </Box>
        <Button
          className="explore-button"
          startIcon={<ArrowBackIcon />}
          variant="text"
          onClick={onBackClickHandler}
        >
          Back to explore
        </Button>
      </Box>
    );
  } else {
    return userLoggedIn
      ? headerForUserLoggedIn()
      : headerForUserLoggedOut();
  }
};

export default Header;
