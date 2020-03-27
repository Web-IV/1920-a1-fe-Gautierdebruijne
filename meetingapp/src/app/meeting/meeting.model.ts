interface MeetingJson {
    name:string;
    verkopers:string[];
    dateAdded:string;
}

export class Meeting{
    constructor(
        private _name: string,
        private _verkopers = new Array<string>(),
        private _dateAdded = new Date()
    ){}

    static fromJSON(json: MeetingJson): Meeting{
        const m = new Meeting(json.name, json.verkopers, new Date(json.dateAdded));
        return m;
    }

    get dateAdded():Date{
        return this._dateAdded;
    }

    get verkopers():Array<string>{
        return this._verkopers
    }

    get name():string{
        return this._name;
    }

    addVerkoper(name:string, title?:string){
        this._verkopers.push(`${name} ${title || ""}`);
    }
}