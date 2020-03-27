import { Component, OnInit } from '@angular/core';
import { MEETINGS } from './../mock-meetings';
import { Meeting } from './../meeting.model';
import { MeetingDataService } from '../meeting-data.service';

@Component({
  selector: 'app-meeting-list',
  templateUrl: './meeting-list.component.html',
  styleUrls: ['./meeting-list.component.css']
})
export class MeetingListComponent {
  constructor(private _meetingDataService: MeetingDataService) { }

  get meetings(): Meeting[]{
    return this._meetingDataService.meetings;
  }

  addNewMeeting(meeting){
    this._meetingDataService.addNewMeeting(meeting);
  }
}
