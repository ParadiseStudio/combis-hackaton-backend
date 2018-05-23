const mongoose = require("mongoose");


const DonationSchema = new mongoose.Schema({
    date: { type: mongoose.Schema.Types.Date },


});


DonationSchema.pre('save',
    function (next) {
        this.date = new Date();
    })

module.exports = {
    schema: DonationSchema,
    model: mongoose.model('Donation', DonationSchema)
};