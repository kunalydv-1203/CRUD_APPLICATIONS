 const mongoose = require('mongoose');
 mongoose.connect('mongodb://localhost:27017',{});
 const userdata = {
    username:String,
    age:String,
    gender:String,
    occupation:String,
    education:String,
    blog:String,
    mail:String,
    password:String
 }

 const user = mongoose.model("user",userdata)
 module.exports = user;