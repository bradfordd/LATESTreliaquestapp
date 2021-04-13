const express = require('express');
const router = express.Router();

let Register = require('../models/register.model');

/*router.post('/components/register', (request, response) => {
    const registeredUser = new registerTemplateCopy({
        fullName:request.body.fullName,
        username:request.body.username,
        email:request.body.email,
        password:request.body.password,
        teacher:request.body.teacher
    })
    registeredUser.save()
    .then(data=>{
        response.json(data)
    })
    .catch(error =>{
        response.json(error)
    })
})*/

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

module.exports = router;

/*
const router = require('express').Router();
let Exercise = require('../models/exercise.model');

router.route('/').get((req, res) => {
  Exercise.find()
    .then(exercises => res.json(exercises))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/add').post((req, res) => {
  const username = req.body.username;
  const description = req.body.description;
  const duration = Number(req.body.duration);
  const date = Date.parse(req.body.date);

  const newExercise = new Exercise({
    username,
    description,
    duration,
    date,
  });

  newExercise.save()
  .then(() => res.json('Exercise added!'))
  .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').get((req, res) => {
  Exercise.findById(req.params.id)
    .then(exercise => res.json(exercise))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').delete((req, res) => {
  Exercise.findByIdAndDelete(req.params.id)
    .then(() => res.json('Exercise deleted.'))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/update/:id').post((req, res) => {
  Exercise.findById(req.params.id)
    .then(exercise => {
      exercise.username = req.body.username;
      exercise.description = req.body.description;
      exercise.duration = Number(req.body.duration);
      exercise.date = Date.parse(req.body.date);

      exercise.save()
        .then(() => res.json('Exercise updated!'))
        .catch(err => res.status(400).json('Error: ' + err));
    })
    .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;
*/