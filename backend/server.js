const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

require('dotenv').config();

const app = express();
const port = process.env.PORT || 8080;

app.use(cors());
app.use(express.json());

const uri = process.env.ATLAS_URI;
mongoose.connect(uri, { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true }
);
const connection = mongoose.connection;
connection.once('open', () => {
  console.log("MongoDB database connection established successfully");
})
//ADD ROUTES HERE
const registerRouter = require('./routes/register');
const gradeRouter = require('./routes/grade');
const courseRouter = require('./routes/course');
const loginRouter = require('./routes/login');

app.use('/components/grades', gradeRouter);
app.use('/components/register', registerRouter);
app.use('/components/course', courseRouter);
app.use('/components/login', loginRouter);

app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});

