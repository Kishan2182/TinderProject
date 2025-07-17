const express = require('express');
const app = express();
const PORT = 3000;

//This will only handle GET call to /user
app.get('/user', (req,res)=>{
    res.send({firstName:"TestFirstname",lastName:"TestLastName"});
});     

app.post("/user", (req,res) => {
    res.send("Data saved successfully to the user");
});

app.delete("/user",(req,res)=>{
    res.send("Data deleted successfully ");
});

app.put("/user",(req,res)=>{
    res.send("Data replace successfully on server");
});

app.patch('/user',(req, res)=>{
    res.send("username modified successfully");     
});

//use will match all the http  to /test
app.use('/test',(req,res)=>{
    res.send("I am fun controller");
});

app.listen(PORT,()=>{
    console.log(`App is running on ${PORT}`)
});
