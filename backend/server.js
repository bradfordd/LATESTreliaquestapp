const express = require('express');
const cors = require('cors');

require('dotenv').config();

const app = express();
const port =  process.env.PORT || 8080;

app.use(cors());
app.use(express.json());

app.listen(8080, () => { 
    console.log(`App is listening on port ${port}`);
});