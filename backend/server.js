const express = require('express')

const cors = require('cors')

require('dotenv').config()

const app = express()
const mongoose = require('mongoose')
const dotenv = require('dotenv')
const routesUrls = require('./routes/routes')
dotenv.config()

mongoose.connect(process.env.DATABASE_ACCESS, () => console.log("Database connected"))

const port =  process.env.PORT || 8080;

//app.use(cors());
//app.use(express.json());
app.use('/app', routesUrls) //VERY IMPORTANT, WE MAY NEED TO CHANGE THIS TO ACCOMODATE THE ROUTING OF THE APP
app.listen(8080, () => { 
    console.log(`App is listening on port ${port}`);
});