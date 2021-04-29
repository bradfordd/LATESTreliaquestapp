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
router.route('/singleStudent').put(async(req, res) => {
  //const grade = Number(req.body.grade);
  const studentID = req.body.studentID;
  //const studentID = req.body.studentID;
  //const studentInfo = await Register.find({_id: studentID});
  //const studentName = studentInfo[0].name;
  //const courseInfo = await Course.find({_id: courseID});
  //const courseName = courseInfo[0].name;
  //res.json(courseName);
  //const studentName = studentInfo.name;
  const info = await GradeAverage.find({studentID: studentID});
  res.json(info);
  //newGradeAverage.save()
  //newGrade.save()
  //  .then(() => res.json('Grade added!'))
  //  .catch(err => res.status(400).json('Error: ' + err));
});


//adds student to share list
//requires courseID, and studentID, and studentIDToShareWith
router.route('/shareGrade').put(async(req, res) => {
const courseID = req.body.courseID;
const studentID = req.body.studentID;
const studentIDToShareWith = req.body.studentIDToShareWith;
GradeAverage.updateOne(
  { courseID : courseID, studentID : studentID},
  {$push: { sharedWith : studentIDToShareWith}})
  .then(res.json("grade shared!"))
.catch(err => res.status(400).json('Error: ' + err));
//const info = await GradeAverage.find({ courseID : courseID, studentID : studentID});
//res.json(info);
//const studentID = req.body.studentID;
//const studentInfo = await Register.find({_id: studentID});
//const studentName = studentInfo[0].name;
//const courseInfo = await Course.find({_id: courseID});
//const courseName = courseInfo[0].name;
//res.json(courseName);
//const studentName = studentInfo.name;
//const info = await GradeAverage.find({courseID: courseID});
//res.json("grade shared");
//newGradeAverage.save()
//newGrade.save()
//  .then(() => res.json('Grade added!'))
//  .catch(err => res.status(400).json('Error: ' + err));
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
    //const studentInfo = await Register.find({_id: studentID});
    //const studentName = studentInfo[0].name;
    //const courseInfo = await Course.find({_id: courseID});
    //const courseName = courseInfo[0].name;
    //res.json("Average updated");
    //const studentName = studentInfo.name;
    //const newGradeAverage = new GradeAverage({grade, courseID, studentID, studentName, courseName});
    ///res.json(newGradeAverage);
    //newGradeAverage.save()
    //newGrade.save()
      .then(() => res.json('Update Made!'))
      .catch(err => res.status(400).json('Error: ' + err));
});

//requires courseID
router.route('/entireCourse').put(async(req, res) => {
    //const grade = Number(req.body.grade);
    const courseID = req.body.courseID;
    //const studentID = req.body.studentID;
    //const studentInfo = await Register.find({_id: studentID});
    //const studentName = studentInfo[0].name;
    //const courseInfo = await Course.find({_id: courseID});
    //const courseName = courseInfo[0].name;
    //res.json(courseName);
    //const studentName = studentInfo.name;
    const info = await GradeAverage.find({courseID: courseID});
    res.json(info);
    //newGradeAverage.save()
    //newGrade.save()
    //  .then(() => res.json('Grade added!'))
    //  .catch(err => res.status(400).json('Error: ' + err));
});


//adds student to share list
//requires courseID, and studentID, and studentIDToShareWith
router.route('/shareGrade').put(async(req, res) => {
  const courseID = req.body.courseID;
  const studentID = req.body.studentID;
  const studentIDToShareWith = req.body.studentIDToShareWith;
  GradeAverage.updateOne(
    { courseID : courseID, studentID : studentID},
    {$push: { sharedWith : studentIDToShareWith}})
    .then(res.json("grade shared!"))
  .catch(err => res.status(400).json('Error: ' + err));
  //const info = await GradeAverage.find({ courseID : courseID, studentID : studentID});
  //res.json(info);
  //const studentID = req.body.studentID;
  //const studentInfo = await Register.find({_id: studentID});
  //const studentName = studentInfo[0].name;
  //const courseInfo = await Course.find({_id: courseID});
  //const courseName = courseInfo[0].name;
  //res.json(courseName);
  //const studentName = studentInfo.name;
  //const info = await GradeAverage.find({courseID: courseID});
  //res.json("grade shared");
  //newGradeAverage.save()
  //newGrade.save()
  //  .then(() => res.json('Grade added!'))
  //  .catch(err => res.status(400).json('Error: ' + err));
});

//gets all grades that a particular student has had shared with them
//requires studentID
router.route('/getSharedGrades').put(async(req, res) => {
  const studentID = req.body.studentID;
  GradeAverage.updateOne(
    { courseID : courseID, studentID : studentID},
    {$push: { sharedWith : studentIDToShareWith}})
    .then(res.json("grade shared!"))
  .catch(err => res.status(400).json('Error: ' + err));
  //const info = await GradeAverage.find({ courseID : courseID, studentID : studentID});
  //res.json(info);
  //const studentID = req.body.studentID;
  //const studentInfo = await Register.find({_id: studentID});
  //const studentName = studentInfo[0].name;
  //const courseInfo = await Course.find({_id: courseID});
  //const courseName = courseInfo[0].name;
  //res.json(courseName);
  //const studentName = studentInfo.name;
  //const info = await GradeAverage.find({courseID: courseID});
  //res.json("grade shared");
  //newGradeAverage.save()
  //newGrade.save()
  //  .then(() => res.json('Grade added!'))
  //  .catch(err => res.status(400).json('Error: ' + err));
  });
module.exports = router;