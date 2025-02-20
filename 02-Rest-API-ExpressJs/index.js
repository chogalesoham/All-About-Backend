const express = require("express");
const fs = require("fs");
const users = require("./MOCK_DATA.json");
const app = express();
const PORT = 8080;

app.use(express.urlencoded({ extended: false }));

app.use(
  express.urlencoded({
    extended: false,
    type: "application/x-www-form-urlencoded",
  })
);

app.use((req, res, next) => {
  fs.appendFile(
    "log.txt",
    `\n ${Date.now()}: ${req.ip} : ${req.path} : ${req.method}`,
    (error, data) => next()
  );
});

//Routes
app.get("/users", (req, res) => {
  const html = `<ul> ${users
    .map((user) => `<li>${user.first_name}</li>`)
    .join("")}</ul>`;
  res.send(html);
});

// Rest API Routes
app.get("/api/users", (req, res) => {
  res.json(users);
});

app.post("/api/users", (req, res) => {
  const body = req.body;
  users.push({ id: users.length + 1, ...body });
  fs.writeFile("./MOCK_DATA.json", JSON.stringify(users), (error, data) => {
    return res.json({ Status: "201", data: body });
  });
});

app
  .route("/api/users/:id")
  .get((req, res) => {
    const id = Number(req.params.id);
    const user = users.find((user) => user.id === id);
    res.json(user);
  })
  .patch((req, res) => {
    const id = Number(req.params.id);
    const updateData = req.body;
    const updateIndex = users.findIndex((user) => user.id === id);
    users[updateIndex] = { ...users[updateIndex], ...updateData };
    fs.writeFile("./MOCK_DATA.json", JSON.stringify(users), (error, data) => {
      return res.json({ Status: "Updated User..", data: updateData });
    });
  })
  .delete((req, res) => {
    const id = Number(req.params.id);
    const usersUpdated = users.filter((user) => user.id !== id);
    fs.writeFile(
      "./MOCK_DATA.json",
      JSON.stringify(usersUpdated),
      (error, data) => {
        return res.json({ Message: "User Delete" });
      }
    );
  });

app.listen(PORT, () => console.log(`Server Start at: ${PORT}`));
