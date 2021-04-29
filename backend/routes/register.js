/*We are currently at 19:39 in the video*/
var mongoose = require('mongoose');
const express = require("express");
const bcrypt = require("bcryptjs");
const router = express.Router();
const jwt = require("jsonwebtoken");
const config = require("config");

const Register = require("../models/registermodel");
const Course = require("../models/coursemodel");
let Grade = require('../models/grademodel');
let GradeAverage = require("../models/gradeaveragemodel");

router.route("/").post((req, res) => {
  const username = req.body.username;
  const password = req.body.password;
  const name = req.body.name;
  const address = req.body.address;
  const teacher = Boolean(req.body.teacher);
  const date = req.body.date;
  const admin = false;
  // check if there is already a user
  Register.findOne({ username: req.body.username }).then(user => {
    if (user) return res.status(400).json({ msg: "User already exists" });
    const newRegister = new Register({
      username,
      password,
      name,
      address,
      teacher,
      date,
      admin,
    });
    // Create salt & hash i.e. encryption
    bcrypt.genSalt(10, (err, salt) => {
      bcrypt.hash(newRegister.password, salt, (err, hash) => {
        if (err) throw err;
         newRegister.password = hash;
        newRegister.save().then(user => {
          jwt.sign(
            { id: user.id },
            config.get("jwtSecret"),
            { expiresIn: 3600 },
            (err, token) => {
              if (err) throw err;
              res.json({
                token,
                user: {
                  id: user.id,
                  name: user.name,
                  username: user.username,
                  admin: user.admin,
                  teacher: user.teacher,
                },
              });
            }
          );
        });
      });
    });
    //.then(user => res.json('User Registered!'))
    //.catch(err => res.status(400).json('Error: ' + err));
  });
});

//Deletes all users of a given username
//requires only the username
router.route('/').delete((req, res) => {
  Register.remove({username: req.body.username})
  .then(register => res.json("deletion successful"))
  .catch(err => res.status(400).json('Error: ' + err));
});

//Adds a course to a students assignedCoursesIDs array
//requires studentID and courseID
router.route('/courses').post((req, res) => {
  const courseID = req.body.courseID;
  const studentID = req.body.studentID;

  Register.updateOne(
    { _id: studentID },
    { $push: { assignedCoursesIDs: courseID } })
  .catch(err => res.status(400).json('Error: ' + err));
  Course.updateOne(
    { _id: courseID },
    { $push: { students: studentID } })
  .then(register => res.json("student added!"))
  .catch(err => res.status(400).json('Error: ' + err));
});

//Cascading delete to remove a student/teacher from a course
//requires studentID and courseID
router.route('/deletecourse').put((req, res) => {
  const courseID = req.body.courseID;
  const studentID = req.body.studentID;
  Register.findByIdAndUpdate({ _id: studentID },
    { $pull: { assignedCoursesIDs: courseID } })
  .catch(err => res.status(400).json('Error: ' + err));
  /*Register.updateOne(
    { _id: studentID },
    { $pull: { assignedCoursesIDs: courseID } })
  .catch(err => res.status(400).json('Error: ' + err));*/
  Grade.deleteMany(
    {courseID : courseID,
    studentID : studentID}
  );
  GradeAverage.deleteMany(
    {courseID : courseID,
    studentID : studentID}
    );
    Course.updateOne(
      { _id: courseID, teacherID: studentID },
      { teacherID: "", teacherAssigned: "" } )
    Course.updateOne(
    { _id: courseID },
    { $pull: { students: studentID } })
  .then(register => res.json("student removed!"))
  .catch(err => res.status(400).json('Error: ' + err))
});


//Cascading delete to remove a student/teacher from a course
//requires studentID 
router.route('/cascadingDelete').put((req, res) => {
  const studentID = req.body.studentID;
  Grade.deleteMany(
    {
    studentID : studentID}
  );
  GradeAverage.deleteMany(
    { studentID : studentID}
    );
  Course.updateMany(
    { teacherID: studentID },
    { teacherID: "", teacherAssigned: "" } )
  Course.updateMany(
    { $pull: { students: studentID } });
  Register.findByIdAndDelete(studentID)
  .then(register => res.json("student removed!"))
  .catch(err => res.status(400).json('Error: ' + err));
});

//returns all STUDENTS in the system
router.route('/students').get(async(req, res) => {
  const info = await Register.find({teacher: false});
  res.json(info);
});

//returns all TEACHERS in the system
router.route('/teachers').get(async(req, res) => {
  const info = await Register.find({teacher: true});
  res.json(info);
});

//returns all STUDENTS in the system except logged in
router.route('/studentsExceptLoggedIn').post(async(req, res) => {
  const studentID = req.body.studentID;
  const studentLoggedIn = await Register.find({_id : studentID});
  var info = await Register.find({teacher: false});
  for (var i = 0; i < info.length; i++) {
    if (info[i].name === studentLoggedIn[0].name) {
      info.splice(i, 1);
    }
  }

  res.json(info);
});

module.exports = router;