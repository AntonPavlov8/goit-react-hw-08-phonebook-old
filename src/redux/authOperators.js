import axios from "axios";

const { createAsyncThunk } = require("@reduxjs/toolkit");
axios.defaults.baseURL = "https://connections-api.herokuapp.com";

const token = {
  set(token) {
    axios.defaults.headers.common.Authorization = `Bearer ${token}`;
  },
  unset() {
    axios.defaults.headers.common.Authorization = ``;
  },
};

export const signUp = createAsyncThunk("auth/signup", async (data) => {
  try {
    const response = await axios.post("users/signup", data);
    token.set(response.data.token);
    return response.data;
  } catch (err) {
    throw new Error(err);
  }
});

export const logIn = createAsyncThunk("auth/login", async (data) => {
  try {
    const response = await axios.post("users/login", data);
    if (response.status_code == 400) {
      throw new Error(400);
    }
    token.set(response.data.token);
    return response.data;
  } catch (err) {
    return err;
  }
});
export const logOut = createAsyncThunk("auth/logout", async () => {
  try {
    await axios.post("users/logout");
    return;
  } catch (err) {
    return err;
  }
});
