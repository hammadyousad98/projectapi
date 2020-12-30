const mongoose = require('mongoose');
var config = require("config");
// config.get(db);
// const URI='mongodb+srv://abubakar0707:freakspy007@products.a7dyk.mongodb.net/Products?retryWrites=true&w=majority';


const connectDB = async ()=>{
    await mongoose.connect(config.get("db"),{ useUnifiedTopology: true, useNewUrlParser: true  });
    console.log("Connection Established");
}

module.exports=connectDB; 