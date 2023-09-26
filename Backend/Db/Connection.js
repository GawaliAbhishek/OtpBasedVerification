const dotenv = require('dotenv')
const mongoose = require('mongoose')
dotenv.config()
const connect = () => {
    mongoose.connect(`mongodb+srv://abhishek:${process.env.DBPASS}@cluster0.vkxu6xy.mongodb.net/?retryWrites=true&w=majority`).then(() => {
        console.log("Connected to Database.....");
    }).catch(err => {
        console.log(err);
    })
}

module.exports = connect
