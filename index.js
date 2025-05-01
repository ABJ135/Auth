const express = require("express");
const app = express();
const port =  3000;
require("dotenv").config();

const db = require("./model/models"); 

// Routers
const userRouter = require("./router/User.router");


app.use(express.json());

// Routes
app.use("/user", userRouter);

db.sequelize.sync({ alter: true })
  .then(() => {
    console.log(" PostgreSQL connected and tables synced");
    app.listen(port, () => {
      console.log(`Server is running at http://localhost:${port}`);
    });
  })
  .catch((err) => {
    console.error(" Database connection error:", err);
  });
