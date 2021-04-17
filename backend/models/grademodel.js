const mongoose = require('mongoose')

const Schema = mongoose.Schema;

const gradeSchema = new Schema({
    name:{
        type:String,
        required:true
    },
    gradeAssigned:{
        type:Number,
        required:true
    },
    total:{
        type:Number,
        required:true
    },
    courseID:{
        type:String,
        required:true
    },
    studentID:{
        type:String,
        required:true
    }
});

const Grade = mongoose.model('Grade', gradeSchema);

module.exports = Grade;
