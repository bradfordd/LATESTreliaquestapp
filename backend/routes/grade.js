/* These grade models are going to have to be assigned to student*/
const express = require('express');
const router = express.Router();
let Grade = require('../models/grademodel');

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

//router.route('/').delete((req, res) => {
//  Grade.findByIdAndDelete(req.body.gradeID)
//    .then(() => res.json('Grade deleted!'))
//    .catch(err => res.status(400).json('Error: ' + err));
//});

router.route('/').get((req, res) => {
  Grade.find({})
  .then(grades => res.json(grades))
  .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/individual').get((req,res) => {
  Grade.findOne( {name: req.body.name, courseID: req.body.courseID, studentID: req.body.studentID})
  .then(grades => res.json(grades))
  .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/course').get((req,res) => {
  Grade.find( {courseID: req.body.courseID, studentID: req.body.studentID})
  .then(grades => res.json(grades))
  .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/').delete((req,res) => {
  Grade.deleteOne( {name: req.body.name, courseID: req.body.courseID, studentID: req.body.studentID})
  .then(grades => res.json("grade deleted!"))
  .catch(err => res.status(400).json('Error: ' + err));
  
});
module.exports = router;