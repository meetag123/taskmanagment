const Task = require('../models/Task');

const createTask = async (userId, taskData) => {
  return await Task.create({ ...taskData, userId });
};

const getUserTasks = async (userId) => {
  return await Task.find({ userId }).sort({ createdAt: -1 });
};

const updateTask = async (taskId, userId, updateData) => {
  const task = await Task.findOneAndUpdate(
    { _id: taskId, userId },
    updateData,
    { new: true }
  );

  if (!task) throw new Error('Task not found or not authorized');
  return task;
};

const deleteTask = async (taskId, userId) => {
  const task = await Task.findOneAndDelete({ _id: taskId, userId });
  if (!task) throw new Error('Task not found or not authorized');
  return task;
};

module.exports = {
  createTask,
  getUserTasks,
  updateTask,
  deleteTask,
};