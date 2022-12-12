const mongoose = require('mongoose')

const weekTopicFrequency = ({
    time: {
        type: String,
        require: [true, 'must provide a time']
    },
    topics: {
        type: [Object],
        required: [true, 'must provide topics and its frequency'],
    }
})

module.exports = mongoose.model('weekTopicFrequency', weekTopicFrequency)
