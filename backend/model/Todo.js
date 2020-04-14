const mongoose = require('mongoose');
const Schema = mongoose.Schema;


let ToDo = new Schema({
    id: {
        type: Number
    },
    title: {
        type: String
    },
    fullText: {
        type: String
    },
    priority: {
        type: String,
        enum: ["Low", "Middle", "High"]
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

},
{collection: "todos"})

module.expoorts = mongoose.model('ToDo', ToDo)