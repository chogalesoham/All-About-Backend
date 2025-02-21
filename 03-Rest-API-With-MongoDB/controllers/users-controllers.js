const usersModel = require("../models/user-model");

const createNewUser = async (req, res) => {
  const body = req.body;
  const result = await usersModel.create({
    first_name: body.first_name,
    last_name: body.last_name,
    email: body.email,
    gender: body.gender,
  });
  res.status(201).json({ message: "user created", result });
};

const getAllUsers = async (req, res) => {
  const users = await usersModel.find({});
  res.status(200).json(users);
};

const getSingleUser = async (req, res) => {
  const user = await usersModel.findById(req.params.id);
  res.status(200).json(user);
};

const updateUserById = async (req, res) => {
  const body = req.body;
  const updatedUser = await usersModel.findByIdAndUpdate(req.params.id, {
    first_name: body.first_name,
    last_name: body.last_name,
    email: body.email,
    gender: body.gender,
  });
  res.status(200).json({ message: "user updated..", updatedUser });
};

const deleteUserById = async (req, res) => {
  const deletedUser = await usersModel.findByIdAndDelete(req.params.id);
  res.status(200).json({ message: "user deleted...", deletedUser });
};

module.exports = {
  createNewUser,
  getAllUsers,
  getSingleUser,
  updateUserById,
  deleteUserById,
};
