import mongoose from 'mongoose'

const UserSchema = new mongoose.Schema({
    email: String,
    nickname: String,
    password: String
})


module.exports = mongoose.models.User || mongoose.model('User', UserSchema)