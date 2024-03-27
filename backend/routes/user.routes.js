const express = require('express');
// contoller functions
const { loginUser, signupUser } = require('../controller/user.controller');
const UserRoutes = express.Router();

// login route
UserRoutes.post('/login', loginUser);

// Signup route
UserRoutes.post('/signup', signupUser);

module.exports = UserRoutes;