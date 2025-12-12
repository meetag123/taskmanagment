import { useState, useEffect } from "react";
import {
  Button,
  Table,
  Tag,
  Modal,
  Form,
  Input,
  Select,
  Space,
  message,
  Empty,
} from "antd";
import { PlusOutlined, EditOutlined, DeleteOutlined } from "@ant-design/icons";
import AppHeader from "../components/Header";
import API from "../api/api";

const { TextArea } = Input;

const Dashboard = () => {
  const [tasks, setTasks] = useState([]);
  const [filteredTasks, setFilteredTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingTask, setEditingTask] = useState(null);
  const [searchText, setSearchText] = useState("");
  const [form] = Form.useForm();

  useEffect(() => {
    fetchTasks();
  }, []);

  useEffect(() => {
    const filtered = tasks.filter(
      (t) =>
        t.title.toLowerCase().includes(searchText.toLowerCase()) ||
        (t.description || "").toLowerCase().includes(searchText.toLowerCase())
    );
    setFilteredTasks(filtered);
  }, [searchText, tasks]);

  const fetchTasks = async () => {
    try {
      const res = await API.get("/tasks");
      setTasks(res.data.data || []);
    } catch (err) {
      message.error("Failed to load tasks");
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (values) => {
    try {
      if (editingTask) {
        await API.put(`/tasks/${editingTask._id}`, values);
        message.success("Task updated");
      } else {
        await API.post("/tasks", values);
        message.success("Task created");
      }

      setModalOpen(false);
      setEditingTask(null);
      form.resetFields();
      fetchTasks();
    } catch {
      message.error("Operation failed");
    }
  };

  const handleDelete = (id) => {
    Modal.confirm({
      title: "Delete Task",
      content: "Are you sure you want to delete this task?",
      okText: "Delete",
      okType: "danger",
      onOk: async () => {
        await API.delete(`/tasks/${id}`);
        message.success("Deleted task");
        fetchTasks();
      },
    });
  };

  const statusColor = {
    pending: "default",
    "in-progress": "processing",
    completed: "success",
  };

  const columns = [
    {
      title: "Title",
      dataIndex: "title",
      key: "title",
      render: (t) => <span className="text-gray-900 font-medium">{t}</span>,
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
      render: (text) => (
        <span className="text-gray-600">
          {text || <i className="text-gray-400">No description</i>}
        </span>
      ),
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      filters: [
        { text: "Pending", value: "pending" },
        { text: "In Progress", value: "in-progress" },
        { text: "Completed", value: "completed" },
      ],
      onFilter: (v, r) => r.status === v,
      render: (status) => (
        <Tag color={statusColor[status]}>{status.toUpperCase()}</Tag>
      ),
    },
    {
      title: "Actions",
      key: "actions",
      render: (_, r) => (
        <Space size="middle">
          <Button
            type="link"
            icon={<EditOutlined />}
            onClick={() => {
              setEditingTask(r);
              form.setFieldsValue(r);
              setModalOpen(true);
            }}
          />
          <Button
            type="link"
            danger
            icon={<DeleteOutlined />}
            onClick={() => handleDelete(r._id)}
          />
        </Space>
      ),
    },
  ];

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <AppHeader />

      <div className="max-w-6xl mx-auto p-8">
        <div className="mb-6 flex items-center justify-between">
          <div   style={{ marginLeft: "18px" }}>
            <h1 className="text-3xl font-semibold text-gray-900">Tasks</h1>
          </div>
          <div className="flex items-center  gap-4">
            <Input.Search
              placeholder="Search tasks..."
              allowClear
              size="large"
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
              className="w-72"
            />

            <Button
              type="primary"
              size="large"
              style={{ marginLeft: "18px",marginRight:"18px" }}
              icon={<PlusOutlined />}
              onClick={() => {
                setEditingTask(null);
                form.resetFields();
                setModalOpen(true);
              }}
            >
              Add Task
            </Button>
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-sm border p-6">
          {loading ? (
            <div className="text-center py-20">Loading…</div>
          ) : filteredTasks.length === 0 ? (
            <Empty description="No tasks" />
          ) : (
            <Table
              columns={columns}
              dataSource={filteredTasks}
              rowKey="_id"
              pagination={{ pageSize: 10 }}
            />
          )}
        </div>
      </div>

      {/* Modal */}
      <Modal
        title={editingTask ? "Edit Task" : "Create Task"}
        open={modalOpen}
        onCancel={() => {
          setModalOpen(false);
          setEditingTask(null);
          form.resetFields();
        }}
        footer={null}
      >
        <Form layout="vertical" onFinish={handleSubmit} form={form}>
          <Form.Item name="title" label="Title" rules={[{ required: true }]}>
            <Input placeholder="Enter title" />
          </Form.Item>

          <Form.Item name="description" label="Description">
            <TextArea rows={3} placeholder="Optional description" />
          </Form.Item>

          <Form.Item name="status" label="Status" initialValue="pending">
            <Select>
              <Select.Option value="pending">Pending</Select.Option>
              <Select.Option value="in-progress">In Progress</Select.Option>
              <Select.Option value="completed">Completed</Select.Option>
            </Select>
          </Form.Item>

          <Space className="w-full flex justify-end">
            <Button onClick={() => setModalOpen(false)}>Cancel</Button>
            <Button type="primary" htmlType="submit">
              {editingTask ? "Update" : "Create"}
            </Button>
          </Space>
        </Form>
      </Modal>
    </div>
  );
};

export default Dashboard;
