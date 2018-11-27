var mongoose = require('mongoose')
var Schema = mongoose.Schema

var userSchema = new Schema({
  nama:String,
  pass:String
})
module.exports = mongoose.model('peserta',userSchema)
