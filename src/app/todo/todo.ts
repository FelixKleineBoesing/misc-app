import { Timestamp } from 'rxjs/internal/operators/timestamp';


export class ToDo {
    _id: string;
    title: string = '';
    fullText: string = '';
    priority: Priority = Priority.middle;
    dueTo = null;
    resolved: boolean = false;
    createdAt = null;
    updatedAt = null;
    userID = null;

    constructor(values: object) {
        Object.assign(this, values);
    }
}
export enum Priority {
    low,
    middle,
    high
}