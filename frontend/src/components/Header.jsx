import { Button, Typography, Dropdown, message } from "antd";
import { LogoutOutlined, DownOutlined, UserOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";

const { Title } = Typography;

const Header = () => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user") || "{}");

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login", { replace: true });
    message.success("Logout succesfully")
  };

  const items = [
    { type: "divider" },
    {
      key: "logout",
      label: (
        <span style={{ color: "red", fontWeight: 600 }}>
          <LogoutOutlined /> Logout
        </span>
      ),
      onClick: handleLogout,
    },
  ];

  return (
    <header
      style={{
        background: "#ffffff",
        borderBottom: "1px solid #e6e6e6",
        padding: "12px 24px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        position: "sticky",
        top: 0,
        zIndex: 100,
        boxShadow: "0 4px 12px rgba(0,0,0,0.07)",
      }}
    >
      <Title
        level={3}
        style={{
          margin: 0,
          fontWeight: 700,
          display: "inline-block",
          background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
          WebkitBackgroundClip: "text",
          color: "transparent",
        }}
      >
        Task Management
      </Title>

      <Dropdown menu={{ items }} placement="bottomRight">
        <Button
          size="large"
          style={{
            fontWeight: 600,
            borderRadius: 8,
            display: "flex",
            alignItems: "center",
            gap: 10,
            paddingInline: 16,
            background: "#fafafa",
            color: "#333",
            border: "1px solid #d9d9d9",
          }}
        >
          <UserOutlined style={{ fontSize: 20 }} />

          <div style={{ textAlign: "left", lineHeight: 1 }}>
            <div style={{ fontSize: 14, fontWeight: 600, color: "#333" }}>
              {user.name || "User"}
            </div>
            <div style={{ fontSize: 12, color: "#888" }}>
              {user.email || "user@example.com"}
            </div>
          </div>

          <DownOutlined />
        </Button>
      </Dropdown>
    </header>
  );
};

export default Header;
