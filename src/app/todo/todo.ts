import { Timestamp } from 'rxjs/internal/operators/timestamp';


export class ToDo {
    id: number;
    title: string;
    fullText: string;
    priority: Priority;
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