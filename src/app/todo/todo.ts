

export class ToDo {
    id: number;
    title: string;
    fullText: string;

    constructor(values: object = {}) {
        Object.assign(this, values);
    }
}