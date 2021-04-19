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

//posts a new course, requires name, teacherAssigned
router.route('/').post((req, res) => {
    const name = req.body.name;
    const teacherAssigned = req.body.teacherAssigned;
    const students = [];
    //for (i = 0; i < req.body.students.length; i++) {
    //    students.push(req.body.students[i])
    //}

    const newCourse = new Course({name, teacherAssigned, students});
  
    newCourse.save()
      .then(() => res.json('Course added!'))
      .catch(err => res.status(400).json('Error: ' + err));
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

router.route('')
module.exports = router;