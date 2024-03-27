const userModel = require('../models/user.model');

// login user
const loginUser = async (req, res) => {
    res.json({message: 'login user'})
}

// signup user
const signupUser = async (req, res) => {

    const { email, password } = req.body;

    try{

        const user = await userModel.signup(email, password); // this signup function we build in user.model.js file - that function hashing the password and return along with email. so this const user have email and hashed password.

        res.status(200).json({
            email,
            user // this user object has email and hased password
        })

    } catch (error) {
        res.status(400).json({
            errorMessage: error.message //this error.message is 'Email already in use' message throw from signup function in user.model.js file or signup functionn failing error
        })
    }
}

module.exports = { loginUser, signupUser }