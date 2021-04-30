const express = require('express');
const router = express.Router();
let Grade = require('../models/grademodel');
let Course = require('../models/coursemodel');
const Register = require("../models/registermodel");
let GradeAverage = require("../models/gradeaveragemodel");
const { updateOne } = require('../models/grademodel');


//requires grade, courseID, and studentID
router.route('/').post(async(req, res) => {
    const grade = Number(req.body.grade);
    const courseID = req.body.courseID;
    const studentID = req.body.studentID;
    const studentInfo = await Register.find({_id: studentID});
    const studentName = studentInfo[0].name;
    const courseInfo = await Course.find({_id: courseID});
    const courseName = courseInfo[0].name;
    //res.json(courseName);
    //const studentName = studentInfo.name;
    const newGradeAverage = new GradeAverage({grade, courseID, studentID, studentName, courseName});
    //res.json(newGradeAverage);
    newGradeAverage.save()
    //newGrade.save()
      .then(() => res.json('Grade added!'))
      .catch(err => res.status(400).json('Error: ' + err));
});

//returns grade average information for a particular student
//requires studentID
router.route('/singleStudent').post(async(req, res) => {
  const studentID = req.body.studentID;
  const info = await GradeAverage.find({studentID: studentID});
  res.json(info);
});


//adds student to share list
//requires courseID, and studentID, and studentIDToShareWith
router.route('/shareGrade').put(async(req, res) => {
const studentID = req.body.studentID;
const studentIDToShareWith = req.body.studentIDToShareWith;
GradeAverage.updateMany(
  { studentID : studentID},
  {$push: { sharedWith : studentIDToShareWith}})
  .then(res.json("grade shared!"))
.catch(err => res.status(400).json('Error: ' + err));
});


//updates grade
//requires grade, courseID, and studentID
router.route('/update').post(async(req, res) => {
    const newgrade = Number(req.body.grade);
    const courseID = req.body.courseID;
    const studentID = req.body.studentID;
    const gradeToUpdate2 = await GradeAverage.find({courseID: courseID, studentID: studentID});
    const gradeToUpdate = gradeToUpdate2[0];
    //res.json(gradeToUpdate);
    GradeAverage.updateOne( {courseID: courseID, studentID: studentID}, {grade: newgrade})
    res.json("Grade Updated!")
      .then(() => res.json('Update Made!'))
      .catch(err => res.status(400).json('Error: ' + err));
});

//requires courseID
router.route('/entireCourse').put(async(req, res) => {
    //const grade = Number(req.body.grade);
    const courseID = req.body.courseID;
    const info = await GradeAverage.find({courseID: courseID});
    res.json(info);
});


//adds student to share list
//requires studentID, and studentIDToShareWith
router.route('/shareGrade').put(async(req, res) => {
  const studentID = req.body.studentID;
  const studentIDToShareWith = req.body.studentIDToShareWith;
  GradeAverage.updateMany(
    { studentID : studentID},
    {$push: { sharedWith : studentIDToShareWith}})
    .then(res.json("grade shared!"))
  .catch(err => res.status(400).json('Error: ' + err));
});
//PUSH

//gets all grades that a particular student has had shared with them
//requires studentID
router.route('/getSharedGrades').post(async(req, res) => {
  const studentID = req.body.studentID;
  const studentInfo = await GradeAverage.find();
  var sharedData = [];
  for (var i = 0; i < studentInfo.length; i++) {
    var sharedWith = studentInfo[i].sharedWith;
    if (sharedWith.includes(studentID))
      sharedData.push(studentInfo[i]);
  }
  res.json(sharedData);
  //const sharedArray = await studentInfo[0].sharedWith;
  /*GradeAverage.updateOne(
    { courseID : courseID, studentID : studentID},
    {$push: { sharedWith : studentIDToShareWith}})
    .then(res.json("grade shared!"))
  .catch(err => res.status(400).json('Error: ' + err));*/
  
  });

//deletes a grade from the collection
//requires studentID and courseID
router.route('/deleteGradeAverage').post(async(req, res) => {
  const studentID = req.body.studentID;
  const courseID = req.body.courseID;
  GradeAverage.findOneAndDelete(
    {courseID : courseID, studentID : studentID}
  )
  .then(res.json("grade deleted!"))
  .catch(err => res.status(400).json('Error: ' + err));
  
  });


//gets all gradeAverages
router.route('/').get(async(req, res) => {
  const info = await GradeAverage.find();
  res.json(info);
})

module.exports = router;