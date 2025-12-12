import { Table, Tag, Space, Empty, Button } from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";

const TodoList = ({ tasks, loading, onEdit, onDelete }) => {
  const statusColors = {
    pending: "default",
    "in-progress": "processing",
    completed: "success",
  };
  const tasksWithSerial = tasks.map((task, index) => ({
    ...task,
    serialNumber: index + 1,
  }));
  const columns = [
    {
      title: "#",
      dataIndex: "serialNumber",
      key: "serial",
      width: 80,
      align: "center",
      render: (num) => (
        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-100 to-pink-100 flex items-center justify-center font-bold text-purple-700 shadow-md">
          {num}
        </div>
      ),
    },
    {
      title: <span style={{ fontWeight: 600 }}>Title</span>,
      dataIndex: "title",
      key: "title",
      render: (text) => (
        <span style={{ fontSize: 15, color: "#222", fontWeight: 500 }}>
          {text}
        </span>
      ),
    },
    {
      title: <span style={{ fontWeight: 600 }}>Description</span>,
      dataIndex: "description",
      key: "description",
      render: (text) => (
        <span style={{ color: "#666" }}>
          {text || <i style={{ color: "#aaa" }}>No description</i>}
        </span>
      ),
    },
    {
      title: <span style={{ fontWeight: 600 }}>Status</span>,
      dataIndex: "status",
      key: "status",
      filters: [
        { text: "Pending", value: "pending" },
        { text: "In Progress", value: "in-progress" },
        { text: "Completed", value: "completed" },
      ],
      onFilter: (v, r) => r.status === v,
      render: (status) => (
        <Tag color={statusColors[status]}>
          {status.replace("-", " ").toUpperCase()}
        </Tag>
      ),
    },
    {
      title: <span style={{ fontWeight: 600 }}>Actions</span>,
      key: "actions",
      render: (_, record) => (
        <Space size="middle">
          <Button
            type="link"
            icon={<EditOutlined />}
            onClick={() => onEdit(record)}
          >
            Edit
          </Button>

          <Button
            type="link"
            danger
            icon={<DeleteOutlined />}
            onClick={() => onDelete(record._id)}
          >
            Delete
          </Button>
        </Space>
      ),
    },
  ];

  if (loading) {
    return (
      <div style={{ textAlign: "center", padding: "60px 0" }}>
        <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-gray-400 border-t-transparent"></div>
        <p style={{ marginTop: 20, color: "#666" }}>Loading...</p>
      </div>
    );
  }

  if (!tasks.length) {
    return <Empty description="No tasks found" style={{ marginTop: 80 }} />;
  }

  return (
    <div
      style={{
        background: "#fff",
        borderRadius: 12,
        border: "1px solid #eee",
        padding: 20,
        boxShadow: "0 1px 4px rgba(0,0,0,0.05)",
      }}
    >
      <Table
        columns={columns}
        dataSource={tasksWithSerial}
        rowKey="_id"
        pagination={false}
      />
    </div>
  );
};

export default TodoList;
