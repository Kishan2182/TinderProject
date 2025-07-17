const express = require('express');
const app = express();
const PORT = 3000;

//This will only handle GET call to /user
app.get("/user/:UserId", (req,res)=>{
    console.log(req.params)
    console.log(req.query)// passed using url after ? 
    res.send({firstName:"TestFirstname",lastName:"TestLastName"});
});     

//app.get(regularexpressione can be use here /.*fly$/, (req,res)=>console.log(req.params)res.send({firstName:"TestFirstname",lastName:"TestLastName"});}); 
//app.get(we can add different  /.*fly$/, (req,res)=>console.log(req.params)res.send({firstName:"TestFirstname",lastName:"TestLastName"});}); 

app.listen(PORT,()=>{
    console.log(`App is running on ${PORT}`)
});
