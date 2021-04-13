const mongoose = require('mongoose')

const Schema = mongoose.Schema;

const gradeSchema = new Schema({
    name:{
        type:String,
        required:true
    },
});

const Grade = mongoose.model('Grade', gradeSchema);

module.exports = Grade;
