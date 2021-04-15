const express = require('express');
const router = express.Router();
let Login = require('../models/loginmodel');

router.route('/').get((req, res) => {
    Login.find()
    .then(() => res.json("Logged In!"))
    .catch(err => res.status(400).json('Error: ' + err));
});
router.route('/').post((req, res) => {
  const username = req.body.username;
  const password = req.body.password;
  const newLogin = new Login({
    username,
    password,
  });

  newLogin.save()
  .then(() => res.json('Login created!'))
  .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;