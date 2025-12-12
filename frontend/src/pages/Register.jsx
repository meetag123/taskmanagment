import { useState } from "react";
import { Row, Col, Card, Form, Input, Button, Typography, message } from "antd";
import { UserOutlined, MailOutlined, LockOutlined } from "@ant-design/icons";
import { Link, useNavigate } from "react-router-dom";
import API from "../api/api";

const { Title, Text } = Typography;

const Register = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const onFinish = async (values) => {
    if (values.password !== values.confirmPassword) {
      return message.error("Passwords do not match!");
    }

    try {
      setLoading(true);
      await API.post("/auth/register", {
        name: values.name,
        email: values.email,
        password: values.password,
      });
      message.success("Account created successfully! Please login.");
      navigate("/login");
    } catch (err) {
      message.error(err.response?.data?.message || "Registration failed");
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
          background: "linear-gradient(135deg, #11998e 0%, #38ef7d 100%)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          color: "white",
          padding: "40px",
        }}
      >
        <div style={{ textAlign: "center", maxWidth: 420 }}>
          <Title level={1} style={{ color: "white", marginBottom: 16, fontSize: 52 }}>
            TodoMaster
          </Title>
          <Title level={3} style={{ color: "rgba(255,255,255,0.95)", marginBottom: 24 }}>
            Start your productive journey today
          </Title>
          <Text style={{ fontSize: 19, color: "rgba(255,255,255,0.9)", lineHeight: 1.7 }}>
            Join thousands of users who trust TodoMaster to stay organized, focused, and ahead of their goals.
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
          title={<Title level={3} style={{ textAlign: "center", margin: 0 }}>Create Account</Title>}
          style={{ width: 460, boxShadow: "0 8px 32px rgba(0,0,0,0.1)" }}
          headStyle={{ borderBottom: "none" }}
        >
          <Form layout="vertical" onFinish={onFinish} size="large">
            <Form.Item
              name="name"
              label="Full Name"
              rules={[{ required: true, message: "Please enter your name" }]}
            >
              <Input prefix={<UserOutlined />} placeholder="Meet" />
            </Form.Item>

            <Form.Item
              name="email"
              label="Email"
              rules={[
                { required: true, message: "Please enter your email" },
                { type: "email", message: "Please enter a valid email" },
              ]}
            >
              <Input prefix={<MailOutlined />} placeholder="you@example.com" />
            </Form.Item>

            <Form.Item
              name="password"
              label="Password"
              rules={[
                { required: true, message: "Please create a password" },
                { min: 6, message: "Password must be at least 6 characters" },
              ]}
            >
              <Input.Password prefix={<LockOutlined />} placeholder="Create strong password" />
            </Form.Item>

            <Form.Item
              name="confirmPassword"
              label="Confirm Password"
              rules={[{ required: true, message: "Please confirm your password" }]}
            >
              <Input.Password prefix={<LockOutlined />} placeholder="Re-type password" />
            </Form.Item>

            <Form.Item style={{ marginBottom: 16 }}>
              <Button
                type="primary"
                htmlType="submit"
                block
                loading={loading}
                size="large"
                style={{ background: "#11998e", border: "none" }}
              >
                Create Account
              </Button>
            </Form.Item>

            <div style={{ textAlign: "center" }}>
              <Text type="secondary">
                Already have an account?{" "}
                <Link to="/login" style={{ color: "#11998e", fontWeight: 600 }}>
                  Sign in
                </Link>
              </Text>
            </div>
          </Form>
        </Card>
      </Col>
    </Row>
  );
};

export default Register;