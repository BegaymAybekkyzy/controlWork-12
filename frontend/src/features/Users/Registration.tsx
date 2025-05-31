import React, { useState } from "react";
import { Box, Button, Grid, TextField } from "@mui/material";
import { useAppDispatch, useAppSelector } from "../../app/hooks.ts";
import {
  selectRegistrationErrors,
  selectRegistrationLoading,
} from "./usersSlice.ts";
import { googleLogin, registration } from './userThunks.ts';
import Typography from "@mui/material/Typography";
import { useNavigate } from "react-router-dom";
import { GoogleLogin } from '@react-oauth/google';
import type {IUserRegistration} from "../../types";
const Registration = () => {
  const [form, setForm] = useState<IUserRegistration>({
    email: "",
    password: "",
    displayName: "",
  });

  const dispatch = useAppDispatch();
  const error = useAppSelector(selectRegistrationErrors);
  const loading = useAppSelector(selectRegistrationLoading);
  const navigate = useNavigate();

  const onSubmitForm = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await dispatch(registration(form)).unwrap();
    navigate("/");
  };

  const googleLoginHandler = async (credential: string) => {
    await dispatch(googleLogin(credential)).unwrap();
    navigate("/");
  }

  const getErrors = (fieldName: string) => {
    try {
      if (error && "errors" in error) {
        return error.errors[fieldName].message;
      }
    } catch (e) {
      return undefined;
    }
  };

  const onChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  let errorIsUsername: React.ReactNode;

  if (error && "error" in error) {
    errorIsUsername = (
      <Typography textAlign="center" color="#fa4d4d" marginBottom={4}>
        {error.error}
      </Typography>
    );
  }

  return (
    <div>
      <Typography
        variant={"h3"}
        color="textSecondary"
        textAlign="center"
        marginBottom={3}
      >
        Register
      </Typography>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Grid marginBottom={3}>
          <GoogleLogin
            onSuccess={credentialResponse => {
              if(credentialResponse.credential) {
                void googleLoginHandler(credentialResponse.credential);
              }
            }}
            onError={() => {
              console.log("Login failed");
            }}
          />
        </Grid>

        {errorIsUsername}

        <form onSubmit={onSubmitForm}>
          <Grid container justifyContent="center" spacing={2} marginBottom={3}>
            <Grid size={9}>
              <TextField
                fullWidth
                label="Email"
                name="email"
                disabled={loading}
                helperText={getErrors("email")}
                error={Boolean(getErrors("email"))}
                value={form.email}
                onChange={onChangeInput}
                variant="outlined"
              />
            </Grid>

            <Grid size={9}>
              <TextField
                fullWidth
                label="display name"
                name="displayName"
                disabled={loading}
                helperText={getErrors("displayName")}
                error={Boolean(getErrors("displayName"))}
                value={form.displayName}
                onChange={onChangeInput}
                variant="outlined"
              />
            </Grid>

            <Grid size={9}>
              <TextField
                fullWidth
                id="outlined-basic"
                label="Password"
                type="password"
                disabled={loading}
                helperText={getErrors("password")}
                error={Boolean(getErrors("password"))}
                value={form.password}
                name="password"
                onChange={onChangeInput}
                variant="outlined"
              />
            </Grid>
            <Grid size={9}>
              <Button
                variant="contained"
                sx={{ backgroundColor: "#483D8B" }}
                type="submit"
                color="primary"
                disabled={loading}
              >
                Sign in
              </Button>
            </Grid>
          </Grid>
        </form>
      </Box>
    </div>
  );
};

export default Registration;
