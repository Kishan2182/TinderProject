const express =require('express');
const app = express();
const PORT = 3000;

app.use('/fun',(req,res)=>{
    res.send("I am fun controller");
})

app.use('/port',(req,res)=>{
    res.send(`hii I am running on port ${PORT}`)
}) 
 
app.use('/',(req,res) => { res.send("Hii I am home directory")})
app.listen(PORT,()=>{
    console.log(`App is running on ${PORT}`)
});
