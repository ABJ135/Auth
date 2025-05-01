const express = require("express");
const app = express();
const port = 3000;
require("dotenv").config();

const db = require("./model/models");

const userRouter = require("./router/User.router");
const catRouter = require("./router/category.router");
const postRouter = require("./router/post.router");

app.use(express.json());

app.use("/user", userRouter);
app.use("/category", catRouter);
app.use("/post", postRouter);

(async () => {
  try {
    await db.sequelize.sync({ alter: true });
    console.log("Connected to PostgreSQL and synced.");
    app.listen(port, () => console.log(`Server running on http://localhost:${port}`));
  } catch (err) {
    console.error("DB connection failed:", err);
  }
})();
