const express = require("express");
const cors = require("cors");
const Database = require("./dataBase");
const router = require("./router/TaskRoute");
require("dotenv").config();

const app = express();

const PORT = process.env.PORT;

// DATABASE CONNECTION
Database();

// MIDDLEWARE
app.use(express.json());
app.use(cors());

// ROUTES
app.use("/api/tasks", router);

app.listen(PORT, () => {
  console.log(`Server is Listening PORT: ${PORT}`);
});
