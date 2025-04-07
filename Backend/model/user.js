var mongoose = require('mongoose')

const userSchema = mongoose.Schema({
    username: String,
    email: String,
    admin: Boolean,
    password: String,
    token: String,
    profilePicture: String 
})


const User = mongoose.model('user', userSchema)

module.exports = User