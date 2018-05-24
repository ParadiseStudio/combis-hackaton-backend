const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const config = require("../config/general"); 

const UserSchema = new mongoose.Schema({
    username: {
        type: mongoose.Schema.Types.String,
        match: [/^[a-zA-Z0-9]+$/, "Invalid username provided"],
        trim: true,
        required: [true, "username is required"],
        unique: true,
        index: true
    },
    email: {
        type: mongoose.Schema.Types.String,
        match: [/^\S+@\S+\.\S+/, "email is not valid"],
        trim: true,
        required: [true, "email is required"],
        unique: true,
    },
    location : { type: [Number], index: '2dsphere'},
    password: { type: mongoose.Schema.Types.String, required: true }
}, { timestamps: true });


UserSchema.pre('save',
    function (next) {
        if (this.isModified('password') || this.isNew) {
            bcrypt.genSalt(10).then(
                (salt) => {
                    bcrypt.hash(this.password, salt).then(
                        (hashedPassword) => {
                            this.password = hashedPassword
                            return next();
                        },
                        err => next(err)
                    )
                },
                err => next(err)
            )
  
        } else {
            return next()
        }
    })


UserSchema.methods = {
    comparePassword: function (passwordInput, callback) {
        bcrypt.compare(passwordInput, this.password).then( 
            (isSame) => {
                return callback(null, isSame)
            },
            err => callback(err, null)
        )
    }
}

module.exports = mongoose.model("User", UserSchema);


