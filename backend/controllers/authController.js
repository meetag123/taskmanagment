const catchAsync = require('../utils/catchAsync');
const { successResponse, errorResponse } = require('../utils/response');
const authService = require('../services/authService');

const registerUser = catchAsync(async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return errorResponse(res, 'Please provide all fields', 400);
  }

  const user = await authService.registerUser({ name, email, password });

  return successResponse(res, user, 'User registered successfully', 201);
});

const loginUser = catchAsync(async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return errorResponse(res, 'Please provide email and password', 400);
  }

  const user = await authService.loginUser({ email, password });

  return successResponse(res, user, 'Login successful');
});

module.exports = { registerUser, loginUser };