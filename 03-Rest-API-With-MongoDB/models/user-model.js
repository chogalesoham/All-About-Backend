const mongoose = require("mongoose");

//MongoDb Schema
const usersSchema = new mongoose.Schema(
  {
    first_name: {
      type: String,
      required: true,
    },
    last_name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    gender: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

// Mongodb Model
const usersModel = mongoose.model("user", usersSchema);

module.exports = usersModel;
