import React, { useState } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks.ts";
import {
  selectAuthenticationErrors,
  selectAuthenticationLoading,
} from "./usersSlice.ts";
import { useNavigate } from "react-router-dom";
import { authentication, googleLogin } from './userThunks.ts';
import Typography from "@mui/material/Typography";
import { Box, Button, Grid, TextField } from "@mui/material";
import { GoogleLogin } from '@react-oauth/google';
import type {IUserLogin} from "../../types";

const Authentication = () => {
  const [form, setForm] = useState<IUserLogin>({
    email: "",
    password: "",
  });

  const dispatch = useAppDispatch();
  const error = useAppSelector(selectAuthenticationErrors);
  const loading = useAppSelector(selectAuthenticationLoading);
  const navigate = useNavigate();

  const onSubmitForm = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await dispatch(authentication(form)).unwrap();
    navigate("/");
  };

  const googleLoginHandler = async (credential: string) => {
    await dispatch(googleLogin(credential)).unwrap();
    navigate("/");
  }

  const onChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  return (
    <div>
      <Typography
        variant={"h3"}
        color="textSecondary"
        textAlign="center"
        marginBottom={3}
      >
        Login
      </Typography>

      {error ? (
        <Typography textAlign="center" color="#fa4d4d" marginBottom={4}>
          {error.error}
        </Typography>
      ) : null}

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

        <form onSubmit={onSubmitForm}>
          <Grid container spacing={2} marginBottom={3}>
            <Grid size={12}>
              <TextField
                fullWidth
                label="Email"
                name="email"
                disabled={loading}
                value={form.email}
                onChange={onChangeInput}
                variant="outlined"
              />
            </Grid>
            <Grid size={12}>
              <TextField
                fullWidth
                id="outlined-basic"
                label="Password"
                disabled={loading}
                value={form.password}
                name="password"
                onChange={onChangeInput}
                variant="outlined"
              />
            </Grid>
          </Grid>
          <Button
            variant="contained"
            sx={{ backgroundColor: "#483D8B" }}
            type="submit"
            color="primary"
            disabled={loading}
          >
            Sign in
          </Button>
        </form>
      </Box>
    </div>
  );
};

export default Authentication;
