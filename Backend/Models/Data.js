const mongoose = require('mongoose');

const dataSchema = mongoose.Schema({

    name: {
        type: String,
        required: true
    },
    language: {
        type: String,
        required: true
    },
    id: {
        type: String,
        required: true
    },
    bio: {
        type: String,
        required: true
    },
    version: {
        type: Number,
        required: true
    }

});

const Data = mongoose.model("data", dataSchema);
module.exports = Data;
