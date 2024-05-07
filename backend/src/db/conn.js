const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost:27017/SignIN",{
    // useNewUrlParser:true,
    // useUnifiedTopology:true,
    // useCreateIndex:true
}).then(()=>{
    console.log("Connection established")
}).catch((e)=>{
    console.log("No connection ", e);
})
const User = require("../models/register");


