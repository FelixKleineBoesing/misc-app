const mongoose = require('mongoose');
const Schema = mongoose.Schema;


let ToDo = new Schema({
    title: {
        type: String
    },
    fullText: {
        type: String
    },
    priority: {
        type: Number,
        enum: [0, 1, 2]
    },
    dueTo: {
        type: Date
    },
    resolved: {
        type: Boolean
    },
    timeCreated: {
        type: Date
    },
    timeLastChange: {
        type: Date
    }
}, {
    collection: "todos"
})

module.exports = mongoose.model('ToDo', ToDo);