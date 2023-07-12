import Login from "pages/Login";
import SignUp from "pages/Signup";
import { Navigate, Route, Routes } from "react-router-dom";
import { PhoneBook } from "./PhoneBook";
import PrivateRoute from "./PrivateRoute";
import PublicRoute from "./PublicRoute";
export const Navigation = () => {
  return (
    <Routes>
      <Route
        path="register"
        element={
          <PublicRoute>
            <SignUp />
          </PublicRoute>
        }
      />
      <Route
        path="login"
        element={
          <PublicRoute>
            <Login />
          </PublicRoute>
        }
      />
      <Route
        path="contacts"
        element={
          <PrivateRoute>
            <PhoneBook />
          </PrivateRoute>
        }
      />
      <Route path="*" element={<Navigate to="/contacts" />} />
    </Routes>
  );
};
