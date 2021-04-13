const express = require('express');
const router = express.Router();
let Grade = require('../models/grade.model');

router.route('/').post((req, res) => {
    const name = req.body.name;

    const newGrade = new Grade({name});
  
    newGrade.save()
      .then(() => res.json('Grade added!'))
      .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;