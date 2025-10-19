const jwt = require("jsonwebtoken");
const User = require("../model/user")

const userAuth = async (req, res, next) => {
  try {
    const { token } = req.cookies;
    if (!token) {
      return res.status(401).send("Please Login!!!")
    }
    const decodedmessage = jwt.verify(token, "Secret$123");
    const { _id } = decodedmessage;
    const user = await User.findById(_id);
    if (!user) {
       throw new Error("User Not Found");
     } 
     req.user =user;
     next();
  } catch (error) {
    res.status(500).send(error.message);
  }
};

module.exports = {
 userAuth
};
