const express = require("express");
const app = express();
const PORT = 3000;

const {AdminAuth,UserAuth} = require("./middlewares/auth");

app.use("/user",UserAuth);
app.use("/admin",AdminAuth);

app.get("/user",(req, res, next) => {
  // res.send("I am Use method");
  console.log(`${req.me} ${req.url}`)
  console.log("This is use method");
  next();
},(req, res)=>{
  res.send("I am actually going to skip ")
});

app.get("/admin",(req, res) => {
  try {
    throw error
    console.log("I am a user route");
    res.send("I am called ");
  } catch (error) {
  
  }

});

app.get("/user/getUserDeatil",(req ,res)=>{
  console.log("Skip routes using next()")
  res.send("Skip routes using next('Route')")
})

app.get("/admin/getalluser", (req, res) => {
  res.send("I am example 2 ");
});

// app.get(
//   "/example",
//   (req, res, next) => {
//     console.log("I am 1st method");
//     // res.send("I am first method");
//     next();
//   },
//   [
//     (req, res, next) => {
//       console.log("I am 2nd method");
//       next();
//     },
//     (req, res) => {
//       console.log("I am 3rd method");
//       res.send("I am  3rd method");
//     },
//   ]
// );

// app.get("/admin/getalluser", middlewarefun, (req, res) => {
//   res.send("I am example 2 ");
// });

// we can pass array of methods  in the http method

app.use("/",(err,req,res,next)=>{
  if(err){
    res.send("Something went wrong");
  }
})

app.listen(PORT, () => {
  console.log(`App is running on ${PORT}`);
});
