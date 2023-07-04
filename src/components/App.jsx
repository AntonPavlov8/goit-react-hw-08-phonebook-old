import Login from "pages/Login";
import SignUp from "pages/Signup";
import { Route, Routes } from "react-router-dom";
import { PhoneBook } from "./PhoneBook";
import PrivateRoute from "./PrivateRoute";
import PublicRoute from "./PublicRoute";
import { UserMenu } from "./UserMenu";

import { Layout, Menu, theme } from "antd";

export const App = () => {
  const { Header, Content, Footer, Sider } = Layout;
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  return (
    <Layout style={{ height: "100vh" }}>
      <Layout>
        <UserMenu />

        {/* <Header style={{ padding: 0, background: colorBgContainer }} /> */}
        <Content style={{ margin: "24px 16px 24px" }}>
          <div
            style={{
              background: colorBgContainer,
              height: "100%",
            }}
          >
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
              <Route path="/" element={<div>lllx</div>} />
            </Routes>
          </div>
        </Content>
        {/* <Footer style={{ textAlign: "center" }}>
          Ant Design ©2023 Created by Ant UED
        </Footer> */}
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
