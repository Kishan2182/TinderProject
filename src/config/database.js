const mongoose = require('mongoose');

const connectDB = async () =>{
    await mongoose.connect("mongodb+srv://kishanmishra2182002_db_user:8YokfprChdjf57ZL@cluster0.btdlhkh.mongodb.net/Tinder");
};

module.exports = connectDB







