/* These grade models are going to have to be assigned to student*/
const express = require('express');
const router = express.Router();
let Grade = require('../models/grademodel');
let Course = require('../models/coursemodel');
//What we require in a grade post request
//name, gradeAssigned, total, courseName, courseID (in MongoDB), and studentID(in MongoDB)
router.route('/').post((req, res) => {
    const name = req.body.name;
    const gradeAssigned = Number(req.body.gradeAssigned);
    const total = Number(req.body.total);
    const courseID = req.body.courseID;
    const studentID = req.body.studentID;

    const newGrade = new Grade({name, gradeAssigned, total, courseID, studentID});
  
    newGrade.save()
      .then(() => res.json('Grade added!'))
      .catch(err => res.status(400).json('Error: ' + err));
});

//Returns an individual grade given a course
//requires name, courseID, and studentID
router.route('/individual').get((req,res) => {
  Grade.findOne( {name: req.body.name, courseID: req.body.courseID, studentID: req.body.studentID})
  .then(grades => res.json(grades))
  .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/').get((req,res) => {
  Grade.find( { courseID: req.body.courseID, studentID: req.body.studentID})
  .then(grades => res.json(grades))
  .catch(err => res.status(400).json('Error: ' + err));
});

//returns a letter grade for a given course
router.route('/lettergrade').get(async(req,res) => {
  var grades = await Grade.find( { courseID: req.body.courseID, studentID: req.body.studentID});
  var assignedGradesTotal = 0;
  var gradesTotal = 0;
  for (var i = 0; i < grades.length; i++) {
    assignedGradesTotal += grades[i].gradeAssigned;
    gradesTotal += grades[i].total;
  }
  numberGrade = assignedGradesTotal / gradesTotal;
  numberGrade = numberGrade * 100;
  res.json(numberGrade);
  //.then(grades => res.json(grades))
  //.catch(err => res.status(400).json('Error: ' + err));
});

//Deletes a grade given grade name, courseID for course grade belongs to, and the studentID
//that the grade belongs to 
router.route('/').delete((req,res) => {
  Grade.deleteOne( {name: req.body.name, courseID: req.body.courseID, studentID: req.body.studentID})
  .then(grades => res.json("grade deleted!"))
  .catch(err => res.status(400).json('Error: ' + err));
});

//Deletes all instances of an assignment from a course gradebook
//requires name and courseID
router.route('/deleteAssignment').delete((req,res) => {
  Grade.deleteAll( {name: req.body.name, courseID: req.body.courseID})
  .then(grades => res.json("grade deleted!"))
  .catch(err => res.status(400).json('Error: ' + err));
});

//updates the score of a grade given grade name, courseID for course grade belongs to, and the studentID
//that the grade belongs to
//Also requires the new grade to be assigned
router.route('/').put((req,res) => {
  Grade.updateOne( {name: req.body.name, courseID: req.body.courseID, studentID: req.body.studentID}, 
  {gradeAssigned: req.body.gradeAssigned})
  .then(() => res.json('Grade updated!'))
      .catch(err => res.status(400).json('Error: ' + err));
});
module.exports = router;