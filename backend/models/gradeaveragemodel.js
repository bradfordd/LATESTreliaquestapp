const mongoose = require('mongoose')

const Schema = mongoose.Schema;

const gradeaverageSchema = new Schema({
    grade:{
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
    },
    studentName:{
        type:String,
        required:true
    },
    courseName:{
        type:String,
        required:true
    }
});

const GradeAverage = mongoose.model('GradeAverage', gradeaverageSchema);

module.exports = GradeAverage;