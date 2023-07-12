import { Button, Form, Input, message, Space } from "antd";
import { useEffect } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { logIn } from "redux/authOperators";
import { errorSelector, loadingSelector } from "redux/authSelectors";

export default function Login() {
  const error = useSelector(errorSelector);
  const isLoading = useSelector(loadingSelector);
  const dispatch = useDispatch();
  const [data, setData] = useState({
    email: null,
    password: null,
  });

  const [messageApi, contextHolder] = message.useMessage();

  useEffect(() => {
    const showError = () => {
      messageApi.open({
        type: "error",
        content: "User cannot be found",
      });
    };
    if (error) {
      showError();
    }
  }, [error, messageApi]);

  const handleChange = (e) =>
    setData({ ...data, [e.target.name]: e.target.value });

  const passwordValidator = (_, value) => {
    if (value && value.length < 7) {
      return Promise.reject(
        new Error("Password must be at least 7 characters")
      );
    }

    return Promise.resolve();
  };
  return (
    <div
      style={{
        padding: "100px 150px",
        margin: "0 auto",
        maxWidth: "700px",
        alignItems: "center",
      }}
    >
      {contextHolder}
      <h1>Log in</h1>
      <Form onFinish={() => dispatch(logIn(data))}>
        <Form.Item
          name="email"
          label="E-mail"
          rules={[
            {
              type: "email",
              message: "The input is not valid E-mail!",
            },
            {
              required: true,
              message: "Please input your E-mail!",
            },
          ]}
          onChange={handleChange}
        >
          <Input name="email" />
        </Form.Item>
        <Form.Item
          name="password"
          label="Password"
          rules={[
            { required: true, message: "Please input your password!" },
            { validator: passwordValidator },
          ]}
          onChange={handleChange}
        >
          <Input.Password name="password" />
        </Form.Item>
        <Space>
          <Button type="primary" htmlType="submit" loading={isLoading}>
            Log in
          </Button>
          <Link to={"/register"}>
            <Button color="secondary">Sign up</Button>
          </Link>
        </Space>
      </Form>
    </div>
  );
}
