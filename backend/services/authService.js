const bcrypt = require('bcryptjs');
const User = require('../models/User');
const generateToken = require('../utils/generateToken');

const registerUser = async ({ name, email, password }) => {
  const userExists = await User.findOne({ email });
  if (userExists) throw new Error('User already exists');

  const hash = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, hash);

  const user = await User.create({
    name,
    email,
    password: hashedPassword,
  });

  return {
    _id: user._id,
    name: user.name,
    email: user.email,
    token: generateToken(user._id),
  };
};

const loginUser = async ({ email, password }) => {
  const user = await User.findOne({ email });
  if (!user) throw new Error('Invalid email or password');

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) throw new Error('Invalid email or password');

  return {
    _id: user._id,
    name: user.name,
    email: user.email,
    token: generateToken(user._id),
  };
};

module.exports = {
  registerUser,
  loginUser,
};