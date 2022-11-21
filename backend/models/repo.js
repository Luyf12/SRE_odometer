const mongoose = require('mongoose')

const Repo = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'must provide name'], //must have the property
    },
    owner: {
        type: String,
        required: [true, 'must provide owner']
    },
    uploader:{
        type:String,
        required: [true, 'must provide uploader']
    },
    forks:{
        type: Number,
        required: [true, 'must provide forks']
    },
    stars:{
        type: Number,
        required: [true, 'must provide stars']
    },
    open_issues:{
        type: Number,
        required: [true, 'must provide open_issues']
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
    contributors:{
        type:[Object],
        required: [true, 'must provide contributors'],
    },
    timeline:{
        type:Object
    },
    language:{
        type:Object
    }
})

module.exports = mongoose.model('RepoSchema', Repo)