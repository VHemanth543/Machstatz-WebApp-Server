const mongoose = require('mongoose')


const addcustomerSchema = new mongoose.Schema({
    firstName : {
        type : String,
        required : true,
    },
    lastName : {
        type : String,
        required : true,
    },
    email : {
        type : String,
        required : true,
    },
    password : {
        type : String,
        required : true,
    },
    userName : {
        type : String,
        required : true,
    },
    date : {
        type : Date,
        default : Date.now
    },
})


const addcustomer = mongoose.model('addcustomer',addcustomerSchema)
module.exports = addcustomer;