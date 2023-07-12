import { getUser, signUp, logIn, logOut } from "./authOperators";
const { createSlice } = require("@reduxjs/toolkit");

const initialState = {
  user: { name: null, email: null },
  token: null,
  isLoading: false,
  isLoggedIn: false,
  loginError: null,
};
const authReducer = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      //already logged in
      .addCase(getUser.fulfilled, (state, action) => {
        state.user.name = action.payload.name;
        state.user.email = action.payload.email;
        state.isLoggedIn = true;
      })
      //signup
      .addCase(signUp.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.isLoggedIn = true;
      })
      //login
      .addCase(logIn.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(logIn.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.isLoggedIn = true;
        state.loginError = null;
        state.isLoading = false;
      })

      .addCase(logIn.rejected, (state, action) => {
        state.loginError = action.meta.requestId;
        state.isLoading = false;
      })
      //logout
      .addCase(logOut.fulfilled, (state, action) => {
        state.user = { name: null, password: null };
        state.isLoggedIn = false;
      });
  },
});
// export const { } = authReducer.actions;

export default authReducer.reducer;
