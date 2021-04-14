/* These grade models are going to have to be assigned to student*/
const express = require('express');
const router = express.Router();
let Grade = require('../models/grade.model');

router.route('/').post((req, res) => {
    const name = req.body.name;
    const gradeAssigned = Number(req.body.gradeAssigned);
    const total = Number(req.body.total);
    const course = req.body.course;

    const newGrade = new Grade({name, gradeAssigned, total, course});
  
    newGrade.save()
      .then(() => res.json('Grade added!'))
      .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').delete((req, res) => {
  Grade.findByIdAndDelete(req.params.id)
    .then(() => res.json('Grade deleted!'))
    .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;