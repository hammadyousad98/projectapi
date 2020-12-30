var mongoose = require("mongoose");
const joi = require('@hapi/joi');
var bcrypt = require('bcryptjs');
var userschema = mongoose.Schema({
    name : String,
    email : String,
    password : String,
    role :{
        type :String,
        default : "user",
    }
});
userschema.methods.generateHashedPassword = async function(){
    let salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password,salt);
}
var usermodel = mongoose.model("users",userschema);

function validateuser(data)
{
    const schema = joi.object({
        name : joi.string().min(3).max(10).required(),
        email : joi.string().email().min(3).max(30).required(),
        password : joi.string().min(3).max(10).required(),
    });
    return schema.validate(data,{abortEarly : false});
}
function validateuserlogin(data)
{
    const schema = joi.object({
        email : joi.string().email().min(3).max(10).required(),
        password : joi.string().min(3).max(10).required(),
    });
    return schema.validate(data,{abortEarly : false});
}

module.exports.User=usermodel;
module.exports.validate = validateuser;//for signup
module.exports.validateuserlogin = validateuserlogin;//for login