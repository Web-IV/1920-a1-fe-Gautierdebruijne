import { Verkoper, VerkoperJson } from './verkoper.model';

interface MeetingJson {
    id: number;
    name:string;
    verkopers:VerkoperJson[];
    date: Date
}

export class Meeting{
    private _id: number;

    constructor(
        private _name: string,
        private _verkopers = new Array<Verkoper>(),
        private _date: Date
    ){}

    static fromJSON(json: MeetingJson): Meeting{
        const m = new Meeting(json.name, json.verkopers.map(Verkoper.fromJSON), json.date);
        m._id = json.id;
        return m;
    }

    toJSON() : MeetingJson {
        return <MeetingJson>{
            name: this.name,
            verkopers: this.verkopers.map(v => v.toJSON()),
            date: this.date
        };
    }
    
    addVerkoper(name:string, title?:string){
        this._verkopers.push(new Verkoper(name, title));
    }

    get id(): number {
        return this._id;
    }

    get date():Date{
        return this._date;
    }

    get verkopers():Verkoper[]{
        return this._verkopers;
    }

    get name():string{
        return this._name;
    }
}