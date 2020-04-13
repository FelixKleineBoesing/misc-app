import { Timestamp } from 'rxjs/internal/operators/timestamp';


export class ToDo {
    id: number;
    title: string = '';
    fullText: string = '';
    priority: Priority = Priority.middle;
    dueTo = null;
    resolved: boolean = false;

    constructor(values: object = {}) {
        Object.assign(this, values);
    }
}

export enum Priority {
    low,
    middle,
    high
}