/*We are currently at 19:39 in the video*/
const express = require("express");
const bcrypt = require("bcryptjs");
const router = express.Router();
const jwt = require("jsonwebtoken");
const config = require("config");

const Register = require("../models/registermodel");
const Course = require("../models/coursemodel");
let Grade = require('../models/grademodel');


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
  .catch(err => res.status(400).json('Error: ' + err))
});

//Cascading delete to remove a student from a course
//requires studentID and courseID
router.route('/courses').delete((req, res) => {
  const courseID = req.body.courseID;
  const studentID = req.body.studentID;
  
  Register.updateOne(
    { _id: studentID },
    { $pull: { assignedCoursesIDs: courseID } })
  .catch(err => res.status(400).json('Error: ' + err));
  Grade.deleteMany(
    {courseID : courseID,
    studentID : studentID}
    )
    .catch(err => res.status(400).json('Error: ' + err));
  Course.updateOne(
    { _id: courseID },
    { $pull: { students: studentID } })
  .then(register => res.json("student removed!"))
  .catch(err => res.status(400).json('Error: ' + err))
});
module.exports = router;