const express = require("express");
const connectDB = require("./config/database");
const app = express();
const PORT = 3000;
const User = require("./model/user");
const bcrypt = require("bcrypt");
const { validateSignUpData } = require("./utils/validation");
const validator = require("validator");

app.use(express.json());

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
    console.log(emailId + " " + password);

    if (emailId && !validator.isEmail(emailId)) {
      throw new Error("Invalid Email Id");
    }

    const user = await User.findOne({ emailId: emailId });

    if (!user) {
      throw new Error("Invalid Credential");
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new Error("Invalid Credential");
    } else {
      res.send("Login Successfull!!!");
    }
  } catch (error) {
    res.send("Error : " + error.message);
  }
});

app.get("/user", async (req, res) => {
  const userEmail = req.body.emailId;
  console.log(userEmail);

  try {
    const userdetail = await User.findOne({ emailId: userEmail });
    if (!userdetail) {
      res.status(404).send("user not found");
    } else {
      res.status(200).send(userdetail);
    }
  } catch (error) {
    res.status(500).send("something went wrong");
  }
});

app.get("/feed", async (req, res) => {
  try {
    const userDetail = await User.find({});
    if (userDetail.length === 0) {
      res.status(404).send("user not found");
    } else {
      res.status(200).send(userDetail);
    }
  } catch (error) {
    res.status(500).send("Something went wrong");
  }
});

app.delete("/user", async (req, res) => {
  const userId = req.body.userId;
  console.log(userId);
  try {
    const user = await User.findByIdAndDelete(userId);
    //const user = await User.findOneAndDelete({_id:userId});
    res.send("User deleted Successfully");
  } catch (error) {
    res.status(500).send("Something went wrong");
  }
});

app.patch("/user/:userId", async (req, res) => {
  const userId = req.params.userId;
  console.log(userId);
  const data = req.body;
  console.log(data);

  try {
    const ALLOWED_UPDATES = ["age", "gender", "photoUrl", "about", "skills"];
    const isUpdateAllowed = Object.keys(data).every((key) =>
      ALLOWED_UPDATES.includes(key)
    );

    if (!isUpdateAllowed) {
      throw new Error("Update not Allowed ");
    }

    if (req.body?.skills?.length > 10) {
      throw new Error("only upto 10 skills are allowed");
    }

    const user = await User.findByIdAndUpdate(userId, data, {
      returnDocument: "after",
      runValidators: true,
    });
    console.log(user);
    res.send("User updated Successfully");
  } catch (error) {
    res.status(500).send("Something went wrong: " + error.message);
  }
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
