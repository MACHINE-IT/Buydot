import { Button, CircularProgress, Stack, TextField } from "@mui/material";
import { Box } from "@mui/system";
import axios from "axios";
import { SnackbarProvider, useSnackbar } from "notistack";
import React, { useState } from "react";
import { config } from "../App";
import Footer from "./Footer";
import Header from "./Header";
import "./Register.css";

const Register = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [apiLoading, setApiLoading] = useState(false);

  const usernameChangeHandler = (e) => {
    setUsername(e.target.value);
  };

  const passwordChangeHandler = (e) => {
    setPassword(e.target.value);
  };

  const confirmPasswordChangeHandler = (e) => {
    setConfirmPassword(e.target.value);
  };

  const formSubmitHandler = (e) => {
    e.preventDefault();

    const formData = {
      username: username,
      password: password,
    };

    register(formData);
  };

  const { enqueueSnackbar } = useSnackbar();

  // TODO: CRIO_TASK_MODULE_REGISTER - Implement the register function
  /**
   * Definition for register handler
   * - Function to be called when the user clicks on the register button or submits the register form
   *
   * @param {{ username: string, password: string, confirmPassword: string }} formData
   *  Object with values of username, password and confirm password user entered to register
   *
   * API endpoint - "POST /auth/register"
   *
   * Example for successful response from backend for the API call:
   * HTTP 201
   * {
   *      "success": true,
   * }
   *
   * Example for failed response from backend for the API call:
   * HTTP 400
   * {
   *      "success": false,
   *      "mhessage": "Username is already taken"
   * }
   */
  const register = async (formData) => {
    const userData = { ...formData };
    // console.log(`formData in register function at line 57 is: ${JSON.stringify(userData)}`);
    const isInputValid = validateInput();
    if (isInputValid) {
      setApiLoading(true);
      try {
        console.log(`user data is valid is: ${isInputValid}`);
        const backedPostURL = `${config.endpoint}/auth/register`;
        console.log(backedPostURL);
        const response = await axios.post(backedPostURL, userData);
        const responseStatus = response.status;
        console.log(
          `helloresponse: ${response}, responseStatus is: ${response.status} and response message is: ${response.message}`
        );
        setApiLoading(false);
        if (responseStatus === 201) {
          enqueueSnackbar(
            "Registered successfully",
            { variant: "success" },
            {
              anchorOrigin: {
                vertical: "top",
                horizontal: "center",
              },
            }
          );
        } else {
          throw new Error(response);
        }
      } catch (error) {
        setApiLoading(false);
        console.log(
          `response: ${error.response.status.toString()}, responseStatus is: ${error.status
          } and response message is: ${error.message}`
        );
        if (error.response.status.toString().match(/^4/)) {
          enqueueSnackbar(
            error.response.data.message,
            { variant: "error" },
            {
              anchorOrigin: {
                vertical: "top",
                horizontal: "center",
              },
            }
          );
        } else {
          enqueueSnackbar(
            "Something went wrong. Check that the backend is running, reachable and returns valid JSON.",
            { variant: "error" },
            {
              anchorOrigin: {
                vertical: "top",
                horizontal: "center",
              },
            }
          );
        }
      }
    }

    // try {
    //   const response = axios.post(backedPostURL)
    // } catch (e) {

    // }
  };

  // TODO: CRIO_TASK_MODULE_REGISTER - Implement user input validation logic
  /**
   * Validate the input values so that any bad or illegal values are not passed to the backend.
   *
   * @param {{ username: string, password: string, confirmPassword: string }} data
   *  Object with values of username, password and confirm password user entered to register
   *
   * @returns {boolean}
   *    Whether validation has passed or not
   *
   * Return false if any validation condition fails, otherwise return true.
   * (NOTE: The error messages to be shown for each of these cases, are given with them)
   * -    Check that username field is not an empty value - "Username is a required field"
   * -    Check that username field is not less than 6 characters in length - "Username must be at least 6 characters"
   * -    Check that password field is not an empty value - "Password is a required field"
   * -    Check that password field is not less than 6 characters in length - "Password must be at least 6 characters"
   * -    Check that confirmPassword field has the same value as password field - Passwords do not match
   */
  const validateInput = (data) => {
    //const inputData = {...data};

    if (
      username.length &&
      username.length >= 6 &&
      password.length &&
      password.length >= 6 &&
      password === confirmPassword
    ) {
      return true;
    } else {
      if (!username.length) {
        enqueueSnackbar(
          "Username is a required field",
          { variant: "warning" },
          {
            anchorOrigin: {
              vertical: "top",
              horizontal: "center",
            },
          }
        );
      } else if (username.length && username.length < 6) {
        enqueueSnackbar(
          "Username must be at least 6 characters",
          { variant: "warning" },
          {
            anchorOrigin: {
              vertical: "top",
              horizontal: "center",
            },
          }
        );
      } else if (!password.length) {
        enqueueSnackbar(
          "Password is a required field",
          { variant: "warning" },
          {
            anchorOrigin: {
              vertical: "top",
              horizontal: "center",
            },
          }
        );
      } else if (password.length < 6) {
        enqueueSnackbar(
          "Password must be at least 6 characters",
          { variant: "warning" },
          {
            anchorOrigin: {
              vertical: "top",
              horizontal: "center",
            },
          }
        );
      } else if (password.length > 6 && password !== confirmPassword) {
        enqueueSnackbar(
          "Passwords do not match",
          { variant: "warning" },
          {
            anchorOrigin: {
              vertical: "top",
              horizontal: "center",
            },
          }
        );
      }
    }
  };

  return (
    <SnackbarProvider
      anchorOrigin={{
        vertical: "top",
        horizontal: "center",
      }}
      maxSnack={3}
    >
      <Box
        display="flex"
        flexDirection="column"
        justifyContent="space-between"
        minHeight="100vh"
        className="mainForRegister"
      >
        <Header hasHiddenAuthButtons />
        <form onSubmit={formSubmitHandler}>
          <Box className="content">
            <Stack spacing={2} className="form">
              <h2 className="title">Register</h2>

              <TextField
                id="username"
                label="Username"
                variant="outlined"
                title="Username"
                name="username"
                value={username}
                onChange={usernameChangeHandler}
                placeholder="Enter Username"
                fullWidth
              />
              <TextField
                id="password"
                variant="outlined"
                label="Password"
                name="password"
                type="password"
                helperText="Password must be atleast 6 characters length"
                fullWidth
                placeholder="Enter a password with minimum 6 characters"
                value={password}
                onChange={passwordChangeHandler}
              />
              <TextField
                id="confirmPassword"
                variant="outlined"
                label="Confirm Password"
                name="confirmPassword"
                type="password"
                fullWidth
                value={confirmPassword}
                onChange={confirmPasswordChangeHandler}
              />
              <Stack direction="column" alignItems="center" spacing={2}>
                {apiLoading ? (
                  <CircularProgress />
                ) : (
                  <Button
                    type="submit"
                    id="submit-button"
                    className="button"
                    variant="contained"
                  >
                    Register Now
                  </Button>
                )}
              </Stack>

              <p className="secondary-action">
                Already have an account?{" "}
                <a className="link" href="#">
                  Login here
                </a>
              </p>
            </Stack>
          </Box>
        </form>
        <Footer />
      </Box>
    </SnackbarProvider>
  );
};

export default Register;
