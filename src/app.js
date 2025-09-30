const express = require("express");
const connectDB = require("./config/database");
const app = express();
const PORT = 3000;
const User = require("./model/user");


app.post("/signup", async (req, res) => {
  const user = new User({
    fistName: "virendra",
    lastName: "sehwag",
    emailId: "sehwag@test.com",
    age: 40,
  });

  try {
    await user.save();
    console.log("User created Successfully");
    res.send("User created Successfully")
  } catch (error) {
    console.log("error" + error.message);
    res.send("error creating user")
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
