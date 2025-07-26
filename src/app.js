const express = require("express");
const app = express();
const PORT = 3000;

const middlewarefun = (req, res, next) => {
  const token = 999;
  const auth = token === 999;
  if (!auth) {
    res.status(401).send("Unauthorized attempts to access");
  } else {
    console.log("Write some custom logic in between");
    next();
  }
};

app.get("/user", (req, res, next) => {
  // res.send("I am Use method");
  console.log("This is use method");
  next('route');
},(req, res)=>{
  res.send("I am actually going to skip ")
});

app.get("/user", (req, res) => {
  console.log("I am a user route");
  res.send("I am called ");
});

app.get("/user/1",(req ,res)=>{
  console.log("Skip routes using next()")
  res.send("Skip routes using next('Route')")
})
app.get(
  "/example",
  (req, res, next) => {
    console.log("I am 1st method");
    // res.send("I am first method");
    next();
  },
  [
    (req, res, next) => {
      console.log("I am 2nd method");
      next();
    },
    (req, res) => {
      console.log("I am 3rd method");
      res.send("I am  3rd method");
    },
  ]
);

app.get("/example2", middlewarefun, (req, res) => {
  res.send("I am example 2 ");
});

// we can pass array of methods  in the http method

app.listen(PORT, () => {
  console.log(`App is running on ${PORT}`);
});
