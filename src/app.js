const express = require("express");
const connectDB = require("./config/database");
const User = require("./model/user");
const bcrypt = require("bcrypt");
const { validateSignUpData } = require("./utils/validation");
const validator = require("validator");
const cookieParser = require("cookie-parser");
const jwt = require("jsonwebtoken");
const { userAuth } = require("./middlewares/auth");

const app = express();
const PORT = 3000;
app.use(express.json());
app.use(cookieParser());

app.post("/signup", async (req, res) => {
  try {
    console.log(req.body);
    //validation
    validateSignUpData(req);

    const {
      firstName,
      lastName,
      emailId,
      password,
      age,
      gender,
      photoUrl,
      about,
      skills,
    } = req.body;

    //Encryptiom
    const encryptedPassword = await bcrypt.hash(password, 10);

    const user = new User({
      firstName,
      lastName,
      emailId,
      password: encryptedPassword,
      age,
      gender,
      photoUrl,
      about,
      skills,
    });

    console.log(user);
    await user.save();
    console.log("User created Successfully");
    res.send("User created Successfully");
  } catch (error) {
    console.log("error" + error.message);
    res.send("Error: " + error.message);
  }
});

app.post("/login", async (req, res) => {
  try {
    const { emailId, password } = req.body;

    if (emailId && !validator.isEmail(emailId)) {
      throw new Error("Invalid Email Id");
    }

    const user = await User.findOne({ emailId: emailId });

    if (!user) {
      throw new Error("Invalid Credential");
    }
    const isPasswordValid = await user.validatePassword(password)
    if (isPasswordValid) {
      // Create a JWT Token
      const token = await user.getJWT();
      // Add the token to Cookies and send back the response back to the user
      res.cookie("token", token, {
        expires: new Date(Date.now()+ 7*24*60*60*1000),
        httpOnly: true, 
      });
      res.send("Login Successfull!!!");
    } else {
      throw new Error("Invalid Credential");
    }
  } catch (error) {
    res.send("Error : " + error.message);
  }
});

app.get("/profile", userAuth, (req, res) => {
  try {
    res.send(req.user);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

app.post("/sendConnectionRequest", userAuth,(req, res) => {

  res.send("Connection request Sent");
});

connectDB()
  .then((res) => {
    console.log("Application connected with database ");
    app.listen(PORT, () => {
      console.log(`App is running on ${PORT}`);
    });
  })
  .catch((err) => {
    console.log("Failed to connect to database");
  });
