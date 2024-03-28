const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const validator = require('validator');

const userSchema = new mongoose.Schema({

    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    }

}, {timestamps: true})


// static signup method - this funnction is just like a mongodb model predefine function we use in route controller(ex: findOne(), findById()). but this function we created function.
userSchema.statics.signup = async function(email, password) { //this signup function decalre as regular function because we use 'this' keyword inside the function. arrow function can't handle 'this' keyword. remember that.

    // firstly validation
    if (!email || !password) {
        throw Error('❌ All fields must be filled!');
    }
    if (!validator.isEmail(email)) {
        throw Error('❌ Email is noot valid!');
    }
    if (!validator.isStrongPassword(password)){
        throw Error('❌ Password not strong enough!');
    }

    const exists = await this.findOne({ email });

    // check user already exsits
    if(exists){
        throw Error('⚠️ Email already in use');
    }

    // Hashing password using bcrypt
    const salt = await bcrypt.genSalt(10); // generating 10 random characters for bind to our password, because same password can be use users. if the same password hashed it might be same so hackers can easily to hacked. so binding salt to password and then hasing is more secure.
    const hash = await bcrypt.hash(password, salt);

    const user = await this.create({ email, password : hash }) // In here save the email and hashed password to DB when controller call this signup function

    return user; // when call this signup function then we can get user that contain email and hased password.

}


// static login method - this funnction is just like a mongodb model predefine function we use in route controller(ex: findOne(), findById()). but this function we created function.
userSchema.statics.login = async function(email, password) {

    // firstly validation
    if (!email || !password) {
        throw Error('❌ All fields must be filled!');
    }

    const user = await this.findOne({ email });

    // check not-register user
    if(!user){
        throw Error('⚠️ Incorrect email!');
    }

    // compare user entered password with hashed password which is stored in database usinf bcrypt.compare() function.
    const match = await bcrypt.compare(password, user.password);

    // if the password don't match throw error
    if (!match) {
        throw Error('⚠️ Incorrect Password!');
    }

    return user;

}

module.exports = mongoose.model('User', userSchema);