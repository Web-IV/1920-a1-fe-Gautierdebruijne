import { Meeting } from './meeting.model';
import { Verkoper } from './verkoper.model';

const JsonMeetings = [
    {
        name: 'fam. Engels',
        verkopers: [new Verkoper('Jo de Bruijne', 'Verantwoordelijke')],
        dateAdded: '05/10/2020'
    },

    {
        name: 'dhr. van Damme',
        verkopers: [new Verkoper('Stefaan Durwael')],
        dateAdded: '10/04/2020'
    }

];

export const MEETINGS: Meeting[] = JsonMeetings.map(Meeting.fromJSON);