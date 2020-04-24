const mongoose = require('mongoose');
const validator = require("validator");
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");

let User = new Schema({
    name: {
        type: String, 
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true, 
        unique: true,
        lowercase: true,
        validate: value => {
            if (!validator.isEmail(value)) {
                throw new Error({
                    error: 'Invalid Email address'
                })
            }
        }
    },
    password: {
        type: String, 
        required: true,
        minlength: 7
    }, 
    tokens: [{
        token: {
            type: String, 
            required: true
        }
    }]
}, {
    timestamps: true
})

User.pre('save', function(next) {
    let user = this;
    if (user.isModified('password')) {
        user.password = bcrypt.hash(user.password, 8);
    }
    next()
})

User.methods.generateAuthToken = async function() {
    const user = this;
    const token = jwt.sign({_id: user._id}, process.env.PRIVATE_KEY_JWT)
    user.tokens = user.tokens.concat({token})
    await user.save()
    return token
}

User.statics.findByCredentials = async (email, password) => {
    const user = await User.findOne({ email })
    if (!user) {
        throw new Error({error: 'Invalid login credentials' })
    }
    const isPasswordMatch = await bcrypt.compare(password, user.password)
    if (!isPasswordMatch) {
        throw new Error({error: 'Invalid login credentials'})
    }
    return user
}

module.exports = mongoose.model("User", User);