import mongoose, {Document} from 'mongoose';

const Schema = mongoose.Schema;


export interface IToDoDocument extends Document {
    title: string;
    fullText: string;
    priority: number;
    dueTo: Date;
    resolved: boolean;
    userID: string;
    sharedWith: object;
    isUserAllowedToChange(userID: string): boolean;
    isUserAllowedToView(userID: string): boolean;
    isUserAllowed(userID: string, permission: string): boolean;
}


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
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    sharedWith: {
        userID: {
            permission: {
                type: String
            }
        },
    }
}, {
    timestamps: true,
    collection: 'todos'
});

ToDoSchema.methods.isUserAllowedToChange = async function(userID: string) {
    return this.isUserAllowed(userID, 'change');
};

ToDoSchema.methods.isUserAllowedToView = async function(userID: string) {
    return this.isUserAllowed(userID, 'view');
};

ToDoSchema.methods.isUserAllowed = async function(userID: string, permission: string) {
    const todo = this;
    const allowed = todo.userID === userID;
    const reducer = (accumulator: any, currentValue: any) => accumulator || currentValue;
    const allowedSharedWith = todo.sharedWith[userID] === 'change' || false;
    return allowed || allowedSharedWith;
};

export const ToDo = mongoose.model<IToDoDocument>('ToDo', ToDoSchema);
