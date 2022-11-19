const mongoose = require('mongoose')

const Company = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'must provide name'], //must have the property
    },
    owner: {
        type: String,
        required: [true, 'must provide owner']
    },
    stargazers:{
        type:[Object],
        required: [true, 'must provide contributors'],
    },
    committers:{
        type:[Object],
        required: [true, 'must provide contributors'],
    },
    issues:{
        type:[Object],
        required: [true, 'must provide contributors'],
    },
});


module.exports = mongoose.model('company',Company)