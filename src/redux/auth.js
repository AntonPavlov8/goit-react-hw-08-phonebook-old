import { signUp, logIn, logOut } from "./authOperators";
const { createSlice } = require("@reduxjs/toolkit");

const initialState = {
  user: { name: null, email: null },
  token: null,
  isLoggedIn: false,
};
const authReducer = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      //signup
      .addCase(signUp.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.isLoggedIn = true;
      })
      //login
      .addCase(logIn.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.isLoggedIn = true;
      })
      //logout
      .addCase(logOut.fulfilled, (state, action) => {
        state.user = { name: null, password: null };
        state.isLoggedIn = false;
      });
  },
});
export const {} = authReducer.actions;

export default authReducer.reducer;
