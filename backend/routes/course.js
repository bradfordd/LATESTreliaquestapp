/* These grade models are going to have to be assigned to student*/
/* TESTING IN INSOMNIA
{
   "name":"Algebra",
	"teacherAssigned":"Mrs. Doe",
	"student": ["jeffrey", "tom", "Beth"]
}
*/
const express = require('express');
const router = express.Router();
let Course = require('../models/coursemodel');
const Register = require("../models/registermodel");
let Grade = require('../models/grademodel');

//posts a new course, requires name, teacherassigned, and teacherID
router.route('/').post(async(req, res) => {
    const name = req.body.name;
    const teacherAssigned = req.body.teacherAssigned;
    const teacherID = req.body.teacherID;
    const students = [];
   
    const newCourse = new Course({name, teacherAssigned, teacherID, students});
    newCourse.save();
    const newCourseID = newCourse._id;
     Register.updateOne(
      { _id: teacherID },
      { $push: { assignedCoursesIDs: newCourseID } })
    .then(res.json("Course Added!"))   
   .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/allcourses').get(async(req,res) => {
   const courseID = req.body.courseID;
   Course.find()
     .then(course => res.json(course))
     .catch(err => res.status(400).json('Error: ' + err));
});

//returns list of course names
router.route('/names').get(async(req,res) => {
   var names = [];
   var courses = [];
   for (var i = 0; i < req.body.courses.length; i++) {
     courses.push(req.body.courses[i]);
   }
   for (var i = 0; i < courses.length; i++) {
     var temp = await Course.find({_id: courses[i]});
     var newName = temp[0].name;
     names.push(newName);
   }
   res.json(names);
 });

 router.route('/instructorNames').get(async(req,res) => {
   var names = [];
   var courses = [];
   for (var i = 0; i < req.body.courses.length; i++) {
     courses.push(req.body.courses[i]);
   }
   for (var i = 0; i < courses.length; i++) {
     var temp = await Course.find({_id: courses[i]});
     var newName = temp[0].teacherAssigned;
     names.push(newName);
   }
   res.json(names);
 });

 //requires courseID array and studentID
 router.route('/lettergrades').get(async(req,res) => {
   //var courseIDs = [];
   //const studentID = req.body.studentID;
   //var letterGrades = [];
   //for (var i = 0; i < req.body.courseIDs.length; i++){
   //   courseIDs.push(req.body.courseIDs[i]);
   //}
   //var test = await Grade.find({courseID: courseIDs[0], studentID: studentID});
   //res.json(test);
   //for (var i = 0; i < courseIDs.length; i++) {
   //   var assignedGradesTotal = 0;
   //   var gradesTotal = 0;
   //   
   //}
   /*var names = [];
   //var courses = [];
   //for (var i = 0; i < req.body.courses.length; i++) {
   //  courses.push(req.body.courses[i]);
   //}
   //for (var i = 0; i < courses.length; i++) {
   //  var temp = await Course.find({_id: courses[i]});
   //  var newName = temp[0].name;
   //  names.push(newName);
   }
   res.json(names);*/
 });

//returns information about a course
//requires course ID
router.route('/').get((req, res) => {
   const courseID = req.body.courseID;
   Course.findOne({ _id: courseID})
     .then(course => res.json(course))
     .catch(err => res.status(400).json('Error: ' + err));
});
//This is for the case in a Teacher can't be assigned at the time of creation
router.route('/noTeacher').post((req, res) => {
   const name = req.body.name;
   const teacherAssigned = "No Teacher Assigned";
   const students = [];
   //for (i = 0; i < req.body.students.length; i++) {
   //    students.push(req.body.students[i])
   //}

   const newCourse = new Course({name, teacherAssigned, students});
 
   newCourse.save()
     .then(() => res.json('Course added!'))
     .catch(err => res.status(400).json('Error: ' + err));
});

//Assigns a teacher to a course, requires teacherID 
//and courseID, and teacher name
router.route('/teacherAssignment').put((req, res) => {
   //const courseID = req.body.courseID;
   //const teacherID = req.body.teacherID;
   //const name = req.body.name;

   //Course.updateOne({courseID : courseID});
   
 
   //newCourse.save()
   //  .then(() => res.json('Course added!'))
   //  .catch(err => res.status(400).json('Error: ' + err));
});

router.route('')
module.exports = router;