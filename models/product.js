var mongoose = require("mongoose");
const joi = require('@hapi/joi');
var productschema = mongoose.Schema({
    name : String,
    price : Number,
    pid : Number,
    Link : String,
});

var productmodel = mongoose.model("products",productschema);

function validateproduct(data)
{
    const schema = joi.object({
        name : joi.string().min(3).max(100).required(),
        price : joi.number().min(0).required(),
        pid : joi.number().min(0).required(),
        Link : joi.string().required(),
    });
    return schema.validate(data);
}

module.exports.Product=productmodel;
module.exports.validate = validateproduct;