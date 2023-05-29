const mongoose = require('mongoose');
require('dotenv').config();
const URL=process.env.MONGODB_URL;

const dbConnect = async()=> {
    try {
        await mongoose.connect(URL);
        console.log("connected to atlas database...");
    } catch (err) {
        console.log(err);
    }
} 

module.exports=dbConnect;