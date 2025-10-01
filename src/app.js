const express = require("express");
const connectDB = require("./config/database");
const app = express();
const PORT = 3000;
const User = require("./model/user");

app.use(express.json());

app.post("/signup", async (req, res) => {
  // const user = new User({
  //   fistName: "virendra",
  //   lastName: "sehwag",
  //   emailId: "sehwag@test.com",
  //   age: 40,
  // });
  console.log(req.body);
  const user = new User(req.body);
  try {
    await user.save();
    console.log("User created Successfully");
    res.send("User created Successfully");
  } catch (error) {
    console.log("error" + error.message);
    res.send("error creating user" + error.message);
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

app.patch("/user", async (req, res) => {
  const userId = req.body.userId;
  console.log(userId);
  const data = req.body;
  console.log(data);
  try {
    const user = await User.findByIdAndUpdate(userId, data, {
      returnDocument: "after",
      runValidators: true,
    });

    // const user = await User.findOneAndUpdate(
    //   { emailId: email },
    //   { fistName: fistName },
    //   { returnDocument: "after" }
    // );
    console.log(user);
    res.send("User updated Successfully");
  } catch (error) {
    res.status(500).send("Something went wrong" + error.message);
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
