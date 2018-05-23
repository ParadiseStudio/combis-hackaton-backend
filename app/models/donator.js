const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const config = require("../config/general");
const DonationSchema = require("./donation").schema;


const DonatorSchema = new mongoose.Schema({
    email: {
        type: mongoose.Schema.Types.String,
        match: [/^\S+@\S+\.\S+/, "email is not valid"],
        trim: true,
        required: [true, "email is required"],
        unique: true,
    },
    password: { type: mongoose.Schema.Types.String, required: true },
    firstName: {
        type: mongoose.Schema.Types.String,
        trim: true
    },

    lastName: {
        type: mongoose.Schema.Types.String,
        trim: true
    },

    sex: { type: mongoose.Schema.Types.String, enum: ["M", "F"] },

    dateOfBirth: { type: mongoose.Schema.Types.Date },

    phoneNumber: { type: mongoose.SchemaTypes.String },

    bloodType: { type: mongoose.Schema.Types.String, enum: ["0-", "0+", "A-", "A+", "B-", "B+", "AB-", "AB+"], required: false },

    donations: { type: [DonationSchema] },
    employerEmail: {
        type: mongoose.Schema.Types.String,
        match: [/^\S+@\S+\.\S+/, "email is not valid"],
        trim: true,
        required:false,
        unique: false,
    },
}, { timestamps: true });



DonationSchema.pre('save',
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


module.exports = mongoose.model("Donator", DonatorSchema);


 