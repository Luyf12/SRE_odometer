const mongoose = require('mongoose')

const connectDB = (url) => {
    return mongoose.connect('mongodb://localhost')
}

module.exports = connectDB