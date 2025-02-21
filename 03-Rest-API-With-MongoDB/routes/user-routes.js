const express = require("express");
const Router = express.Router();
const {
  createNewUser,
  getAllUsers,
  getSingleUser,
  updateUserById,
  deleteUserById,
} = require("../controllers/users-controllers");

// All Routes
Router.post("/users", createNewUser);

Router.get("/users", getAllUsers);

Router.get("/users/:id", getSingleUser);

Router.patch("/users/:id", updateUserById);

Router.delete("/users/:id", deleteUserById);

module.exports = Router;
