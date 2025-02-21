const express = require("express");
const mongoose = require("mongoose");
const PORT = 8080;
const app = express();
const userRoutes = require("./routes/user-routes");

//MongoDb Connection
mongoose
  .connect("mongodb://127.0.0.1:27017/01-rest-api-with-mongodb")
  .then(() => console.log("mongoDb Connected...."))
  .catch((error) => console.log("Error to Connect mongoDb", error));

//Middleware
app.use(
  express.urlencoded({
    extends: true,
    type: "application/x-www-form-urlencoded",
  })
);

app.use("/api", userRoutes);

app.listen(PORT, () => console.log("Server Start at: " + PORT));
