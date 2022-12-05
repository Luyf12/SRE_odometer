const mongoose = require('mongoose')

const Topic = ({
    topic: {
        type: String,
        require: [true, 'must provide a topic']
    },
    num: {
        type: Number,
        require: [true, 'must provide a num']
    }
})

module.exports = mongoose.model('Topic', Topic)