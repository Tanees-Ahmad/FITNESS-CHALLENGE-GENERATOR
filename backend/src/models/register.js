const mongoose = require("mongoose");
const plm = require("passport-local-mongoose");
// const passportLocalMongoose = require('passport-local-mongoose');
const userSchema = new mongoose.Schema({
    name:{
        type :String,
        required:true
    },
    email: {
        type :String,
        required:true,
        unique:true
    },
    password:{
        type :String,
        required:true
    },
    // confirmpassword:{
    //     type :String,
    //     required:true
    // }
})
userSchema.plugin(plm,{ usernameField: 'email' });
module.exports = mongoose.model("User",userSchema);


