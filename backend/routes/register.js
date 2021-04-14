const express = require('express');
const router = express.Router();

let Register = require('../models/register.model');
let Course = require('../models/course.model');

router.route('/').post((req, res) => {
    const username = req.body.username;
    const password = req.body.password;
    const name = req.body.name;
    const address = req.body.address;
    const teacher = Boolean(req.body.teacher);
    const date = req.body.date;
    const newRegister = new Register({
      username,
      password,
      name,
      address,
      teacher,
      date,
    });
  
    newRegister.save()
    .then(() => res.json('User Registered!'))
    .catch(err => res.status(400).json('Error: ' + err));
  });
  router.route('/:courseid').put((req, res) => {
    //assignedCoursesIDs.push(req.param.courseid);
  });

module.exports = router;

