import { Timestamp } from 'rxjs/internal/operators/timestamp';


export class ToDo {
    _id: string;
    title = '';
    fullText = '';
    priority: Priority = Priority.middle;
    dueTo = null;
    resolved = false;
    createdAt = null;
    updatedAt = null;
    userID = null;
    sharedWith: object[];

    constructor(values: object) {
        Object.assign(this, values);
    }
}
export enum Priority {
    low,
    middle,
    high
}
