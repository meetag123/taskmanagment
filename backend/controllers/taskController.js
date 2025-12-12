const catchAsync = require('../utils/catchAsync');
const { successResponse, errorResponse } = require('../utils/response');
const taskService = require('../services/taskService');

const createTask = catchAsync(async (req, res) => {
  const { title, description, status } = req.body;

  if (!title?.trim()) {
    return errorResponse(res, 'Title is required', 400);
  }

  const task = await taskService.createTask(req.user._id, {
    title,
    description,
    status: status || 'pending',
  });

  return successResponse(res, task, 'Task created successfully', 201);
});

const getTasks = catchAsync(async (req, res) => {
  const tasks = await taskService.getUserTasks(req.user._id);
  return successResponse(res, tasks, 'Tasks fetched successfully');
});

const updateTask = catchAsync(async (req, res) => {
  const task = await taskService.updateTask(req.params.id, req.user._id, req.body);
  return successResponse(res, task, 'Task updated successfully');
});

const deleteTask = catchAsync(async (req, res) => {
  await taskService.deleteTask(req.params.id, req.user._id);
  return successResponse(res, null, 'Task deleted successfully');
});

module.exports = {
  createTask,
  getTasks,
  updateTask,
  deleteTask,
};