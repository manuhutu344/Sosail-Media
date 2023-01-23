const mongoose = require('mongoose')

const VerificationTokenSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref:'User',
        required: true
    },
    token: {
        type: String,
        required: true
    },
    createAt:{
        type: String,
        required: true
    },
})

module.exports = mongoose.model('VerificationToken', VerificationTokenSchema)