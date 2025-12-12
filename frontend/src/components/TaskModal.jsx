import { Modal, Form, Input, Select, Button, Space } from "antd";

const { TextArea } = Input;

const TaskModal = ({ open, onCancel, onSubmit, editingTask, form }) => {
  return (
    <Modal
      title={
        <span style={{ fontSize: 20, fontWeight: 600, color: "#222" }}>
          {editingTask ? "Edit Task" : "Create Task"}
        </span>
      }
      open={open}
      onCancel={onCancel}
      footer={null}
      destroyOnClose
      centered
    >
      <Form
        form={form}
        layout="vertical"
        onFinish={onSubmit}
        style={{ marginTop: 16 }}
      >
        <Form.Item
          name="title"
          label={<span style={{ fontWeight: 600 }}>Title</span>}
          rules={[{ required: true, message: "Please enter a title" }]}
        >
          <Input size="large" placeholder="Enter task title" />
        </Form.Item>

        <Form.Item
          name="description"
          label={<span style={{ fontWeight: 600 }}>Description</span>}
        >
          <TextArea rows={3} placeholder="Optional description" />
        </Form.Item>

        <Form.Item
          name="status"
          label={<span style={{ fontWeight: 600 }}>Status</span>}
          initialValue="pending"
        >
          <Select size="large">
            <Select.Option value="pending">Pending</Select.Option>
            <Select.Option value="in-progress">In Progress</Select.Option>
            <Select.Option value="completed">Completed</Select.Option>
          </Select>
        </Form.Item>

        <Form.Item style={{ marginTop: 20, marginBottom: 0 }}>
          <Space style={{ width: "100%", justifyContent: "flex-end" }}>
            <Button size="large" onClick={onCancel}>
              Cancel
            </Button>
            <Button type="primary" size="large" htmlType="submit">
              {editingTask ? "Update Task" : "Create Task"}
            </Button>
          </Space>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default TaskModal;
