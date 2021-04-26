/* These grade models are going to have to be assigned to student*/
/* TESTING IN INSOMNIA
{
   "name":"Algebra",
	"teacherAssigned":"Mrs. Doe",
	"student": ["jeffrey", "tom", "Beth"]
}
*/
const express = require("express");
const router = express.Router();
let Course = require("../models/coursemodel");
const Register = require("../models/registermodel");
let Grade = require("../models/grademodel");

//posts a new course, requires name, teacherassigned, and teacherID
router.route("/").post(async (req, res) => {
  const name = req.body.name;
  const teacherAssigned = req.body.teacherAssigned;
  const teacherID = req.body.teacherID;
  const students = [];

  const newCourse = new Course({ name, teacherAssigned, teacherID, students });
  newCourse.save();
  const newCourseID = newCourse._id;
  Register.updateOne(
    { _id: teacherID },
    { $push: { assignedCoursesIDs: newCourseID } }
  )
    .then(res.json("Course Added!"))
    .catch(err => res.status(400).json("Error: " + err));
});

//Gets ALL courses
router.route("/allcourses").get(async (req, res) => {
  const courseID = req.body.courseID;
  Course.find()
    .then(course => res.json(course))
    .catch(err => res.status(400).json("Error: " + err));
});

//returns all the courses a student is currently enrolled in
//requires studentID
router.route("/studentcourses").post(async (req, res) => {
  const studentID = req.body.studentID;
  var student = await Register.find({ _id: studentID });
  var assignedCoursesIDs = student[0].assignedCoursesIDs;
  var courseInformation = [];
  for (var i = 0; i < assignedCoursesIDs.length; i++) {
    var tempInformation = await Course.find({ _id: assignedCoursesIDs[i] });
    courseInformation.push(tempInformation);
  }
  res.json(courseInformation);
  //.then(course => res.json(course))
  //.catch(err => res.status(400).json('Error: ' + err));
});
//returns list of course names
//requires array of course IDs
router.route("/names").get(async (req, res) => {
  var names = [];
  var courses = [];
  for (var i = 0; i < req.body.courses.length; i++) {
    courses.push(req.body.courses[i]);
  }
  for (var i = 0; i < courses.length; i++) {
    var temp = await Course.find({ _id: courses[i] });
    var newName = temp[0].name;
    names.push(newName);
  }
  res.json(names);
});

//returns names of instructors given courseIDs
router.route("/instructorNames").get(async (req, res) => {
  var names = [];
  var courses = [];
  for (var i = 0; i < req.body.courses.length; i++) {
    courses.push(req.body.courses[i]);
  }
  for (var i = 0; i < courses.length; i++) {
    var temp = await Course.find({ _id: courses[i] });
    var newName = temp[0].teacherAssigned;
    names.push(newName);
  }
  res.json(names);
});
//returns information about a course
//requires course ID
router.route("/").get((req, res) => {
  const courseID = req.body.courseID;
  Course.findOne({ _id: courseID })
    .then(course => res.json(course))
    .catch(err => res.status(400).json("Error: " + err));
});
//This is for the case in a Teacher can't be assigned at the time of creation
router.route("/noTeacher").post((req, res) => {
  const name = req.body.name;
  const teacherAssigned = "No Teacher Assigned";
  const students = [];
  //for (i = 0; i < req.body.students.length; i++) {
  //    students.push(req.body.students[i])
  //}

  const newCourse = new Course({ name, teacherAssigned, students });

  newCourse
    .save()
    .then(() => res.json("Course added!"))
    .catch(err => res.status(400).json("Error: " + err));
});

//returns array of gradeAverages corresponding to course grades
//requires studentID and array of courseIDs
router.route("/gradeAverages").get(async (req, res) => {
  const courseIDArray = req.body.courseIDs;
  const studentID = req.body.studentID;
  var coursesGrades = [];
  for (var k = 0; k < courseIDArray.length; k++) {
    var grades = await Grade.find({
      courseID: courseIDArray[k],
      studentID: studentID,
    });
    //var grades = await Grade.find( { courseID: "12345", studentID: "12345"});
    //res.json(grades);
    var assignedGradesTotal = 0;
    var gradesTotal = 0;
    for (var i = 0; i < grades.length; i++) {
      assignedGradesTotal += grades[i].gradeAssigned;
      gradesTotal += grades[i].total;
    }
    numberGrade = assignedGradesTotal / gradesTotal;
    numberGrade = numberGrade * 100;
    coursesGrades.push(numberGrade);
  }
  res.json(coursesGrades);
});

//gets all courses a student is NOT currently signed up for
//requires studentID
router.route("/allCoursesStudentDoesntHave").post(async (req, res) => {
  const studentID = req.body.studentID;
  var student = await Register.find({ _id: studentID });
  const studentAssignedCourses = student[0].assignedCoursesIDs;
  //res.json(studentAssignedCourses);
  const allCourses = await Course.find();
  for (var i = 0; i < studentAssignedCourses.length; i++) {
    for (var j = 0; j < allCourses.length; j++) {
      if (allCourses[j]._id == studentAssignedCourses[i])
        allCourses.splice(j, 1);
    }
  }
  res.json(allCourses);
});

//returns all the courses a teacher is currently enrolled in
//requires teacherid
router.route("/teachercourses").post(async (req, res) => {
  const teacherID = req.body.teacherID;
  var teacher = await Register.find({ _id: teacherID });
  var assignedCoursesIDs = teacher[0].assignedCoursesIDs;
  var courseInformation = [];
  for (var i = 0; i < assignedCoursesIDs.length; i++) {
    var tempInformation = await Course.find({ _id: assignedCoursesIDs[i] });
    courseInformation.push(tempInformation);
  }
  res.json(courseInformation);
  //.then(course => res.json(course))
  //.catch(err => res.status(400).json('Error: ' + err));
});

//returns all students enrolled in a course
//requires courseID
router.route("/studentsInCourse").post(async (req, res) => {
  const courseID = req.body.courseID;
  var courses = await Course.find({ _id: courseID });
  var students = courses[0].students;
  var studentInfo = [];
  for (var i = 0; i < students.length; i++) {
    var tempInformation = await Register.find({ _id: students[i] });
    studentInfo.push(tempInformation);
  }
  res.json(studentInfo);
  //.then(course => res.json(course))
  //.catch(err => res.status(400).json('Error: ' + err));
});

router.route("");
module.exports = router;
