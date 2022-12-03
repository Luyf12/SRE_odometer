const mongoose = require('mongoose')

// const Pulls = new mongoose.Schema({
//     // time: {
//     //     type: String,
//     //     required: [true, 'must provide time'], //must have the property
//     // },
//     // name: {
//     //     type: String,
//     //     required: [true, 'must provide name']
//     // },
//     // role: {
//     //     type: String,
//     //     required: [true, 'must provide role']
//     // },
//     // detail: {
//     //     type: [String]
//     // }
//     details: {
//         type: [Object],
//         required: [true, 'must provide detail']
//     }
// })

// module.exports = mongoose.model('PullSchema', Pulls)

const DesignFrequency = ({
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

const TopicFrequency = ({
    time: {
        type: String,
        require: [true, 'must provide a time']
    },
    first: {
        type: String
    },
    firstCount: {
        type: Number
    },
    second: {
        type: String
    },
    secondCount: {
        type: Number
    }
})

module.exports = mongoose.model('DesignFrequencySchema', DesignFrequency)
module.exports = mongoose.model('TopicSchema', Topic)
module.exports = mongoose.model('TopicFrequencySchema', TopicFrequency)