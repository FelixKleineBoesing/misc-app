import mongoose from 'mongoose';

const Schema = mongoose.Schema;


const ToDoSchema = new Schema({
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
    userID: {
        type: String
    },
    sharedWith: [{
        userID: {
            type: String
        }
    }]
}, {
    timestamps: true,
    collection: 'todos'
});

export const ToDo = mongoose.model('ToDo', ToDoSchema);
