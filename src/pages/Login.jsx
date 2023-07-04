import { Button, Form, Input, Space } from "antd";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { logIn } from "redux/authOperators";

export default function Login() {
  const dispatch = useDispatch();
  const [data, setData] = useState({
    email: null,
    password: null,
  });

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
          <Button type="primary" htmlType="submit">
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
