const mongoose = require('mongoose')

const weekTopicFrequency = ({
    owner: {
        type: String,
        require: [true, 'must provide an owner']
    },
    name: {
        type: String,
        require: [true, 'must provide a name']
    },
    info: {
        type: [Object],
        require: [true, 'must provide some info']
    }
})

module.exports = mongoose.model('weekTopicFrequency', weekTopicFrequency)