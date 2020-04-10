

export class ToDo {
    id: number;
    title: string;
    text: string;

    constructor(values: Object = {}) {
        Object.assign(this, values);
    }
}