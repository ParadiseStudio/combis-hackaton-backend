const mongoose = require("mongoose");


const DonationSchema = new mongoose.Schema({
    date: { type: mongoose.Schema.Types.Date },


});


module.exports = DonationSchema