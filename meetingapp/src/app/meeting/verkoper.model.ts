export interface VerkoperJson{
    name:string;
    title:string;
}

export class Verkoper{
    constructor(
        private _name: string,
        private _title?: string
    ){}

    static fromJSON(json: VerkoperJson): Verkoper{
        const v = new Verkoper(json.name, json.title);
        return v;   
    }

    get name():string{
        return this._name;
    }

    get title():string{
        return this._title;
    }
}