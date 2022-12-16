const mongoose = require('mongoose')

const PullNumber = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'must provide name'], 
    },
    owner: {
        type: String,
        required: [true, 'must provide owner']
    },
    numbers: {
        type: Array,
        required: [true, 'must provide number'], 
    },
    pullers :{
        type: Object,
        required: [true, 'must provide number'], 

    }
    
});

module.exports = mongoose.model('pullNumber', PullNumber)
