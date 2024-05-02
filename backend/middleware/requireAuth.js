const jwt = require("jsonwebtoken");
const userModel = require('../models/user.model');

const requireAuth = async (req, res, next) => {
  //verify authentication
  const { authorization } = req.headers;

  if (!authorization) {
    return res.status(401).send({
      error: "🔒 :: Authorization token required!",
    });
  }

  const token = authorization.split(" ")[1]; //In here doing is we need token only. this authorization has frontend request header contained token and it has two part first one is string value and after space other part is token code. so we split it from empty space and get second part of header. so it is array nummber 1.

  try {

    // verify the token we get using jsonwebtoken package. and get user id from databse
    const { _id } = jwt.verify(token, process.env.SECRET_TOKEN);
    req.user = await userModel.findOne({ _id }).select('_id'); //this req.user, user can be any name. i use user.
    
    next(); //this next fire next handler function (ex: in routes file next handling function (addItem, getAllItems, ...))

  } catch (error) {
    console.log(error);
    res.status(401).send({
      error: "⚠️ :: Request is not authorized!",
    });
  }
};

module.exports = requireAuth;
