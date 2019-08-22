var mongoose = require('mongoose')
var Schema = mongoose.Schema

var userSchema  = new Schema({
    name:String,
    mobile:Number,
    password:String,
    role:String
}) 


module.exports = mongoose.model('user',userSchema)