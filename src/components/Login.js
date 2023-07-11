import { Button, CircularProgress, Stack, TextField } from "@mui/material";
import { Box } from "@mui/system";
import axios from "axios";
import { useSnackbar, SnackbarProvider } from "notistack";
import React, { useState } from "react";
import { useHistory, Link } from "react-router-dom";
import { config } from "../App";
import Footer from "./Footer";
import Header from "./Header";
import Register from "./Register"
import "./Login.css";
import Products from "./Products";

const Login = () => {
  const { enqueueSnackbar } = useSnackbar();
  const history = useHistory();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const usernameChangeHandler = (e) => {
    setUsername(e.target.value);
  }

  const passwordChangeHandler = (e) => {
    setPassword(e.target.value);
  }

  const formSubmitHandler = (e) => {
    e.preventDefault();

    const formData = {
      username: username,
      password: password
    }

    login(formData);
  }

  // TODO: CRIO_TASK_MODULE_LOGIN - Fetch the API response
  /**
   * Perform the Login API call
   * @param {{ username: string, password: string }} formData
   *  Object with values of username, password and confirm password user entered to register
   *
   * API endpoint - "POST /auth/login"
   *
   * Example for successful response from backend:
   * HTTP 201
   * {
   *      "success": true,
   *      "token": "testtoken",
   *      "username": "criodo",
   *      "balance": 5000
   * }
   *
   * Example for failed response from backend:
   * HTTP 400
   * {
   *      "success": false,
   *      "message": "Password is incorrect"
   * }
   *
   */
  const login = async (formData) => {
    const userData = { ...formData };
    const validInput = validateInput();
    if (validInput) {
      try {
        setIsLoading(true)
        const loginEndpoint = `${config.endpoint}/auth/login`
        const response = await axios.post(loginEndpoint, userData);
        setIsLoading(false)
        if (response.status === 201) {
          enqueueSnackbar("Logged in successfully", {
            variant: "success",
            anchorOrigin: {
              vertical: "bottom",
              horizontal: "center",
            },
            autoHideDuration: 3000,
          });
          persistLogin(response.data.token, response.data.username, response.data.balance);
          history.push("/");

        } else {
          throw new Error("response.status")
        }
      } catch (error) {
        setIsLoading(false)
        if (error.response.status.toString().match(/^4/)) {
          enqueueSnackbar(
            error.response.data.message,
            {
              variant: "error",
              anchorOrigin: {
                vertical: "bottom",
                horizontal: "center",
              },
              autoHideDuration: 2000,
            });
        } else {
          enqueueSnackbar(
            "Something went wrong. Check that the backend is running, reachable and returns valid JSON.",
            {
              variant: "error",
              anchorOrigin: {
                vertical: "bottom",
                horizontal: "center",
              },
              autoHideDuration: 2000,
            });
        }
      }
    }
  };

  // TODO: CRIO_TASK_MODULE_LOGIN - Validate the input
  /**
   * Validate the input values so that any bad or illegal values are not passed to the backend.
   *
   * @param {{ username: string, password: string }} data
   *  Object with values of username, password and confirm password user entered to register
   *
   * @returns {boolean}
   *    Whether validation has passed or not
   *
   * Return false and show warning message if any validation condition fails, otherwise return true.
   * (NOTE: The error messages to be shown for each of these cases, are given with them)
   * -    Check that username field is not an empty value - "Username is a required field"
   * -    Check that password field is not an empty value - "Password is a required field"
   */
  const validateInput = (data) => {
    if (!username.length || !password.length) {
      const message = !username.length ? "Username is a required field" : "Password is a required field";
      enqueueSnackbar(message, {
        variant: "warning",
        anchorOrigin: {
          vertical: "bottom",
          horizontal: "center",
        },
        autoHideDuration: 2000,
      });
      return false;
    }
    return true;
    // if (!username.length) {

    // }
    // else if (!password.length) {
    //   enqueueSnackbar(
    //     "Password is a required field",
    //     { variant: "warning" },
    //     {
    //       anchorOrigin: {
    //         vertical: "top",
    //         horizontal: "center",
    //       },
    //     }
    //   );
    //   return false;
    // }
  };

  // TODO: CRIO_TASK_MODULE_LOGIN - Persist user's login information
  /**
   * Store the login information so that it can be used to identify the user in subsequent API calls
   *
   * @param {string} token
   *    API token used for authentication of requests after logging in
   * @param {string} username
   *    Username of the logged in user
   * @param {string} balance
   *    Wallet balance amount of the logged in user
   *
   * Make use of localStorage: https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage
   * -    `token` field in localStorage can be used to store the Oauth token
   * -    `username` field in localStorage can be used to store the username that the user is logged in as
   * -    `balance` field in localStorage can be used to store the balance amount in the user's wallet
   */
  const persistLogin = (token, username, balance) => {
    // const userInfo = {
    //   username: username,
    //   token: token,
    //   balance: balance
    // }
    // localStorage.removeItem("userInfo");
    // localStorage.setItem("userInfo", JSON.stringify(userInfo));
    localStorage.setItem('token', token);
    localStorage.setItem('username', username);
    localStorage.setItem('balance', balance);
  };

  return (
    <SnackbarProvider
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "center",
      }}
      autoHideDuration={2000}
    >
      <Box
        display="flex"
        flexDirection="column"
        justifyContent="space-between"
        minHeight="100vh"
      >
        <Header hasHiddenAuthButtons={1} />
        <form onSubmit={formSubmitHandler}>
          <Box className="content">
            <Stack spacing={2} className="form">
              <h1 className="title">Login</h1>
              <TextField
                id="username"
                name="username"
                label="username"
                type="text"
                variant="outlined"
                value={username}
                onChange={usernameChangeHandler}
              />
              <TextField
                id="pasword"
                name="password"
                label="password"
                type="password"
                variant="outlined"
                value={password}
                onChange={passwordChangeHandler}
              />
              <Stack direction="column" alignItems="center" spacing={2}>
                {isLoading ? (
                  <CircularProgress />
                ) : (
                  <Button
                    type="submit"
                    // id="submit-button"
                    className="button"
                    variant="contained"
                  >
                    LOGIN TO BuyDot
                  </Button>
                )}
              </Stack>
              <p>Don't have an account? <span><Link className="link" to="/register">Register Now</Link></span></p>
            </Stack>
          </Box>
        </form>
        <Footer />
      </Box >
    </SnackbarProvider>
  );
};

export default Login;
