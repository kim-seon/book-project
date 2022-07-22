import mongoose from 'mongoose';
import * as bcrypt from 'bcrypt';
const saltRounds = 10;
import jwt from 'jsonwebtoken';

const UserSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    nickname: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        minlength: 5
    },
    token: String,
    tokenExp: Number
})

UserSchema.pre('save', function(next) {
    var user = this;
    if(user.isModified('password')) {
        bcrypt.genSalt(saltRounds, function(err, salt) {
            if(err) return next(err);

            bcrypt.hash(user.password, salt, function(err, hash) {
                if(err) return next(err);
                user.password = hash;
                next();
            })
        })
    } else {
        next();
    }
})

UserSchema.methods.comparePassword = function(plainPassword, cb) {
    bcrypt.compare(plainPassword, this.password, function(err, isMatch) {
        if(err) return cb(err);
        cb(null, isMatch);
    })
}

UserSchema.methods.generateToken = function(cb) {
    var user = this;
    var token = jwt.sign(user._id.toHexString(), 'secretToken')
    
    user.token = token;
    user.save(function(err, user) {
        if(err) return cb(err);
        cb(null, user);
    })
}

UserSchema.statics.findByToken = function(token, cb) {
    var user = this;
    jwt.verify(token, 'secretToken', function(err, decoded) {
        user.findOne({"_id": decoded, "token": token}, function(err, user) {
            if(err) return cb(err);
            cb(null, user);
        })
    })
}

module.exports = mongoose.models.User || mongoose.model('User', UserSchema)