import { UserMenu } from "./UserMenu";
import { Layout, theme } from "antd";
import { Navigation } from "./Navigation";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUser } from "redux/authOperators";
import { isLoadingSelector } from "redux/rootSelectors";
import { LoadingOutlined } from "@ant-design/icons";
import { loadingFalse } from "redux/reducer";
export const App = () => {
  const dispatch = useDispatch();
  const isLoading = useSelector(isLoadingSelector);
  const { Content } = Layout;
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  useEffect(() => {
    const data = localStorage.getItem("data");
    if (data?.length > 0) {
      dispatch(getUser(data)).then(() => {
        dispatch(loadingFalse());
      });
    } else dispatch(loadingFalse());
  }, [dispatch]);
  return (
    <Layout style={{ height: "100vh" }}>
      <Layout>
        <UserMenu />
        {isLoading ? (
          <span
            style={{
              alignItems: "center",
              width: "100%",
              display: "flex",
              justifyContent: "center",
            }}
          >
            <LoadingOutlined style={{ zoom: "3" }} />
          </span>
        ) : (
          <Content style={{ margin: "24px 16px 24px" }}>
            <div
              style={{
                background: colorBgContainer,
                height: "100%",
              }}
            >
              <Navigation />
            </div>
          </Content>
        )}
      </Layout>
    </Layout>
  );
};

// return (
//   <div
//     style={{
//       height: "100vh",
//       display: "flex",
//       justifyContent: "center",
//       alignItems: "center",
//       fontSize: 20,
//       color: "#010101",
//     }}
//   >
//     <UserMenu />
//     <Routes>
//       <Route
//         path="register"
//         element={
//           <PublicRoute>
//             <SignUp />
//           </PublicRoute>
//         }
//       />
//       <Route
//         path="login"
//         element={
//           <PublicRoute>
//             <Login />
//           </PublicRoute>
//         }
//       />
//       <Route
//         path="contacts"
//         element={
//           <PrivateRoute>
//             <PhoneBook />
//           </PrivateRoute>
//         }
//       />
//       <Route path="/" element={<div>lllx</div>} />
//     </Routes>
//   </div>
// );
