const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const config = require("config");
const jwt = require("jsonwebtoken");

require("dotenv").config();

const app = express();
const port = process.env.PORT || 8080;

app.use(cors());
app.use(express.json());

//const uri = process.env.ATLAS_URI;
const uri = config.get("MongoURI");
mongoose.connect(uri, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
});
const connection = mongoose.connection;
connection.once("open", () => {
  console.log("MongoDB database connection established successfully");
});
//ADD ROUTES HERE
const registerRouter = require("./routes/register");
const gradeRouter = require("./routes/grade");
const courseRouter = require("./routes/course");
const loginRouter = require("./routes/login");
const authRouter = require("./routes/auth");
const gradeaverageRouter = require("./routes/gradeaverage");

app.use("/components/grades", gradeRouter);
app.use("/components/register", registerRouter);
app.use("/components/course", courseRouter);
app.use("/components/login", loginRouter);
app.use("/components/auth", authRouter);
app.use("/components/gradeaverage", gradeaverageRouter);

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});
