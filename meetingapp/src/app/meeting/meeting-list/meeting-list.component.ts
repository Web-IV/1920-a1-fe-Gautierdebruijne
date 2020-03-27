import { Component, OnInit } from '@angular/core';
import { MEETINGS } from './../mock-meetings';
import { Meeting } from './../meeting.model';

@Component({
  selector: 'app-meeting-list',
  templateUrl: './meeting-list.component.html',
  styleUrls: ['./meeting-list.component.css']
})
export class MeetingListComponent implements OnInit {
  private _meetings = MEETINGS;

  constructor() { }

  ngOnInit(): void {
  }

  get meetings(){
    return this._meetings;
  }

  addNewMeeting(meeting: Meeting){
    this._meetings.push(meeting);
  }
}
