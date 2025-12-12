import { useState } from "react";
import { Row, Col, Card, Form, Input, Button, Typography, message } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import { Link, useNavigate } from "react-router-dom";
import API from "../api/api";

const { Title, Text } = Typography;

const Login = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const onFinish = async (values) => {
    try {
      setLoading(true);
      const res = await API.post("/auth/login", values);
      localStorage.setItem("token", res.data.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.data));
      message.success(`Welcome back, ${res.data.data.name || "User"}!`);
      navigate("/");
    } catch (err) {
      message.error(err.response?.data?.message || "Invalid credentials");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Row style={{ minHeight: "100vh" }}>
      <Col
        xs={0}
        md={12}
        style={{
          background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          color: "white",
          padding: "40px",
        }}
      >
        <div style={{ textAlign: "center", maxWidth: 400 }}>
          <Title level={1} style={{ color: "white", marginBottom: 16, fontSize: 48 }}>
            TodoMaster
          </Title>
          <Title level={3} style={{ color: "rgba(255,255,255,0.9)", marginBottom: 24 }}>
            Manage your tasks like a pro
          </Title>
          <Text style={{ fontSize: 18, color: "rgba(255,255,255,0.8)", lineHeight: 1.6 }}>
            Organize, prioritize, and conquer your day with the most powerful todo app built for productivity.
          </Text>
        </div>
      </Col>
      <Col
        xs={24}
        md={12}
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#f0f2f5",
          padding: "20px",
        }}
      >
        <Card
          title={<Title level={3} style={{ textAlign: "center", margin: 0 }}>Welcome Back</Title>}
          style={{ width: 420, boxShadow: "0 8px 32px rgba(0,0,0,0.1)" }}
          headStyle={{ borderBottom: "none" }}
        >
          <Form layout="vertical" onFinish={onFinish} size="large">
            <Form.Item
              name="email"
              label="Email"
              rules={[
                { required: true, message: "Please enter your email" },
                { type: "email", message: "Please enter a valid email" },
              ]}
            >
              <Input prefix={<UserOutlined />} placeholder="you@example.com" />
            </Form.Item>

            <Form.Item
              name="password"
              label="Password"
              rules={[{ required: true, message: "Please enter your password" }]}
            >
              <Input.Password prefix={<LockOutlined />} placeholder="••••••••" />
            </Form.Item>

            <Form.Item style={{ marginBottom: 16 }}>
              <Button type="primary" htmlType="submit" block loading={loading} size="large">
                Sign In
              </Button>
            </Form.Item>

            <div style={{ textAlign: "center" }}>
              <Text type="secondary">
                Don't have an account?{" "}
                <Link to="/register" style={{ color: "#667eea", fontWeight: 600 }}>
                  Sign up here
                </Link>
              </Text>
            </div>
          </Form>
        </Card>
      </Col>
    </Row>
  );
};

export default Login;