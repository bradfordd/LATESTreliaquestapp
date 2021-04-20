/*We are currently at 19:39 in the video*/
const express = require("express");
const bcrypt = require("bcryptjs");
const router = express.Router();
const jwt = require("jsonwebtoken");
const config = require("config");

const Register = require("../models/registermodel");
const Course = require("../models/coursemodel");

router.route("/").post((req, res) => {
  const username = req.body.username;
  const password = req.body.password;

  // check if there is user with that username/email
  Register.findOne({ username: username }).then(user => {
    if (!user) return res.status(400).json({ msg: "User does not exist" });

    // Validate password
    bcrypt.compare(password, user.password).then(isMatch => {
      if (!isMatch) return res.status(400).json({ msg: "Invalid credentials" });

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
              assignedCoursesIDs: user.assignedCoursesIDs
            },
          });
        }
      );
    });
  });
});

module.exports = router;
