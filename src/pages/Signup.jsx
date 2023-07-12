import { Button, Form, Input, Space } from "antd";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { signUp } from "redux/authOperators";
import validator from "validator";

export default function SignUp() {
  const dispatch = useDispatch();

  const [data, setData] = useState({
    name: null,
    email: null,
    password: null,
  });

  const handleChange = (e) =>
    setData({ ...data, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    dispatch(signUp(data));
  };

  const passwordValidator = (_, value) => {
    if (value && value.length < 7) {
      return Promise.reject(
        new Error("Password must be at least 7 characters")
      );
    }
    if (validator.contains(value, "password", { ignoreCase: true })) {
      return Promise.reject(
        new Error("Password can't contain word 'password'")
      );
    }
    return Promise.resolve();
  };

  return (
    <div>
      <div
        style={{
          padding: "100px 150px",
          margin: "0 auto",
          maxWidth: "700px",
          alignItems: "center",
        }}
      >
        <h1>Sign up</h1>
        <Form onFinish={handleSubmit}>
          <Space direction="vertical">
            <Form.Item
              name="name"
              label="Name"
              onChange={handleChange}
              rules={[
                {
                  required: true,
                  message: "Please input your Name!",
                },
              ]}
            >
              <Input name="name" />
            </Form.Item>
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
            <Space direction="horizontal">
              <Button type="primary" htmlType="submit">
                Submit
              </Button>
              <Link to={"/login"}>
                <Button color="secondary">Log in</Button>
              </Link>
            </Space>
          </Space>
        </Form>
      </div>
    </div>
  );
}
