import { Injectable } from '@angular/core';
import { Meeting } from './meeting.model';
import { MEETINGS } from './mock-meetings';

@Injectable({
  providedIn: 'root'
})

export class MeetingDataService {
  private _meetings = MEETINGS;
  constructor() { }

  get meetings(): Meeting[]{
    return this._meetings;
  }

  addNewMeeting(meeting: Meeting){
    this._meetings.push(meeting);
  }
}
