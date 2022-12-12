const mongoose = require('mongoose')

const weekDesignFrequency = ({
    time: {
        type: String,
        require: [true, 'must provide a time']
    },
    designed: {
        type: Number,
        require: [true, 'must provide designed count']
    },
    undesigned: {
        type: Number,
        require: [true, 'must provide undesign count']
    }
})


module.exports = mongoose.model('weekDesignFrequency', weekDesignFrequency)
