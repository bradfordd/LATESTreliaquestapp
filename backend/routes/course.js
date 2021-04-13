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
let Course = require('../models/course.model');

router.route('/').post((req, res) => {
    const name = req.body.name;
    const teacherAssigned = req.body.teacherAssigned;
    const students = [];
    for (i = 0; i < req.body.students.length; i++) {
        students.push(req.body.students[i])
    }
//test
    const newCourse = new Course({name, teacherAssigned, students});
  
    newCourse.save()
      .then(() => res.json('Course added!'))
      .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;