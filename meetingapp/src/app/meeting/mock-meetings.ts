import { Meeting } from './meeting.model';
import { Verkoper } from './verkoper.model';

const JsonMeetings = [
    {
        id: 1,
        name: 'fam. Engels',
        verkopers: [new Verkoper('Jo de Bruijne', 'Verantwoordelijke')],
        date: new Date()
    },

    {
        id: 2,
        name: 'dhr. van Damme',
        verkopers: [new Verkoper('Stefaan Durwael')],
        date: new Date()
    }

];

export const MEETINGS: Meeting[] = JsonMeetings.map(Meeting.fromJSON);