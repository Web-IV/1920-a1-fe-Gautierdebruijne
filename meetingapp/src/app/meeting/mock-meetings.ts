import { Meeting } from './meeting.model';

const JsonMeetings = [
    {
        name: 'fam. Engels',
        verkopers: ['Jo de Bruijne'],
        dateAdded: '29/05/2020'
    },

    {
        name: 'dhr. van Damme',
        verkopers: ['Jo de Bruijne', 'Stefaan Durwael'],
        dateAdded: '10/04/2020'
    }

];

export const MEETINGS: Meeting[] = JsonMeetings.map(Meeting.fromJSON);