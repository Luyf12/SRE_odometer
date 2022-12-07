const mongoose = require('mongoose')

const Frequency = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'must provide name'], 
    },
    owner: {
        type: String,
        required: [true, 'must provide owner']
    },
    committers: {
        type: Array,
        required: [true, 'must provide committers']
    },
    pullers: {
        type: Array,
        required: [true, 'must provide committers']
    },
    
    star_frequency:{
        type:Object,
        required: [true, 'must provide star_frequency']
    },
    commit_frequency:{
        type:Object,
        required: [true, 'must provide commit_frequency']
    },
    issue_frequency:{
        type:Object,
        required: [true, 'must provide issue_frequency']
    },
    
});

module.exports = mongoose.model('frequency', Frequency)
