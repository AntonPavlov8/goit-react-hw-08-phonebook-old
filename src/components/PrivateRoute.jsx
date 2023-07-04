import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { isLoggedInSelector } from "../redux/authSelectors";

export default function PrivateRoute({ children }) {
  const isLoggedIn = useSelector(isLoggedInSelector);

  return <div>{isLoggedIn ? children : <Navigate to="/login" />}</div>;
}
