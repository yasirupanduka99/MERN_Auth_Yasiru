const userModel = require('../models/user.model');
const jwt = require('jsonwebtoken');

// Implementing createToken function so we can call this for any route controller function in this file.
const createToken = (_id) => { //this _id can be any name
    return jwt.sign({_id}, process.env.SECRET_TOKEN, { expiresIn: '3d' });
}

// login user
const loginUser = async (req, res) => {

    const { email, password } = req.body;

    try{

        const user = await userModel.login(email, password); // this login function we build in user.model.js file - that function checks the validations and compare hashed password in db with user entered password.

        // create a token
        const token = createToken(user._id); //createToken function implement in top of the file

        res.status(200).json({
            email,
            token
        })

    } catch (error) {
        res.status(400).json({
            errorMessage: error.message
        })
    }

}

// signup user
const signupUser = async (req, res) => {

    const { email, password } = req.body;

    try{

        const user = await userModel.signup(email, password); // this signup function we build in user.model.js file - that function hashing the password and return along with email. so this const user have email and hashed password.

        // create a token
        const token = createToken(user._id); //createToken function implement in top of the file

        res.status(200).json({
            email,
            token,
            message: "✅ User Registered Successfuly!"
        })

    } catch (error) {
        res.status(400).json({
            errorMessage: error.message //this error.message is 'Email already in use' message throw from signup function in user.model.js file or signup functionn failing error
        })
    }
}

module.exports = { loginUser, signupUser }