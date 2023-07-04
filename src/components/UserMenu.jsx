import { nanoid } from "@reduxjs/toolkit";
import { Menu } from "antd";
import Sider from "antd/es/layout/Sider";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { logOut } from "redux/authOperators";
import { isLoggedInSelector, userSelector } from "redux/authSelectors";

export const UserMenu = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector(userSelector);
  const isLoggedIn = useSelector(isLoggedInSelector);
  console.log(user);
  return (
    <Sider style={{ height: "100%" }}>
      <div className="demo-logo-vertical" />
      <Menu theme="dark" mode="inline" style={{ textAlign: "center" }}>
        {isLoggedIn ? (
          <>
            <Menu.Item key={nanoid()} style={{ height: "80px" }}>
              <p>
                {user?.name}
                <br />
                {user?.email}
              </p>
            </Menu.Item>
            <Menu.Item
              key={nanoid()}
              onClick={() => {
                dispatch(logOut());
                navigate("/login");
              }}
            >
              <p>Log out</p>
            </Menu.Item>
          </>
        ) : (
          <Menu.Item key={nanoid()}>
            <Link to={"/login"}>
              <p color="secondary">Log in</p>
            </Link>
          </Menu.Item>
        )}
      </Menu>
    </Sider>
  );
};
{
  /* <div>
  <p>{user.name}</p>
  <p>{user.email}</p>
</div>; */
}
