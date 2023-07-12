export const isLoggedInSelector = (state) => state.auth.isLoggedIn;
export const userSelector = (state) => state.auth.user;
export const errorSelector = (state) => state.auth.loginError;
export const loadingSelector = (state) => state.auth.isLoading;
