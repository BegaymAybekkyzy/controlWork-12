import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosAPI from "../../axiosAPI.ts";
import { isAxiosError } from "axios";
import type {IError, IUser, IUserLogin, IUserRegistration, IValidationError} from "../../types";

export const registration = createAsyncThunk<
  IUser,
  IUserRegistration,
  { rejectValue: IValidationError | IError }
>("users/registration", async (newUser, { rejectWithValue }) => {
  try {
    const formData = new FormData();
    const keys = Object.keys(newUser) as (keyof IUserRegistration)[];

    keys.forEach((key) => {
      const value = newUser[key] as string;
      if (value !== null) {
        formData.append(key, value);
      }
    });

    const response = await axiosAPI.post("users", formData);
    return response.data;

  } catch (error) {
    if (
      isAxiosError(error) &&
      error.response &&
      error.response.status === 400
    ) {
      return rejectWithValue(error.response.data);
    }
    throw error;
  }
});

export const authentication = createAsyncThunk<
  IUser,
  IUserLogin,
  { rejectValue: IError }
>("users/authentication", async (user, { rejectWithValue }) => {
  try {
    const response = await axiosAPI.post("users/sessions", user);
    return response.data.user;
  } catch (error) {
    if (
      isAxiosError(error) &&
      error.response &&
      error.response.status === 400
    ) {
      return rejectWithValue(error.response.data);
    }
    throw error;
  }
});

export const googleLogin = createAsyncThunk<
  IUser,
  string,
  { rejectValue: IError }
>("users/googleLogin", async (credential, { rejectWithValue }) => {
  try {
    const response = await axiosAPI.post("users/google", {credential});
    return response.data.user;
  } catch (error) {
    if (
      isAxiosError(error) &&
      error.response &&
      error.response.status === 400
    ) {
      return rejectWithValue(error.response.data);
    }
    throw error;
  }
});

export const logout = createAsyncThunk<void, void>("users/logout", async () => {
  await axiosAPI.delete("users/sessions");
});
