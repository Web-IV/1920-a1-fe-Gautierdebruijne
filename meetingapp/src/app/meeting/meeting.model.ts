import { Verkoper, VerkoperJson } from './verkoper.model';

interface MeetingJson {
    name:string;
    verkopers:VerkoperJson[];
    dateAdded:string;
}

export class Meeting{
    constructor(
        private _name: string,
        private _verkopers = new Array<Verkoper>(),
        private _dateAdded = new Date()
    ){}

    static fromJSON(json: MeetingJson): Meeting{
        const m = new Meeting(json.name, json.verkopers.map(Verkoper.fromJSON), new Date(json.dateAdded));
        return m;
    }

    toJSON() : MeetingJson {
        return <MeetingJson>{
            name: this.name,
            verkopers: this.verkopers.map(v => v.toJSON()),
            dateAdded: this.dateAdded.toString()
        };
    }
    
    addVerkoper(name:string, title?:string){
        this._verkopers.push(new Verkoper(name, title));
    }

    get dateAdded():Date{
        return this._dateAdded;
    }

    get verkopers():Verkoper[]{
        return this._verkopers;
    }

    get name():string{
        return this._name;
    }
}