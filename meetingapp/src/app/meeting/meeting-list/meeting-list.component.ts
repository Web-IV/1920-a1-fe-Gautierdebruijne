import { Component, OnInit } from '@angular/core';
import { Meeting } from './../meeting.model';
import { MeetingDataService } from '../meeting-data.service';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-meeting-list',
  templateUrl: './meeting-list.component.html',
  styleUrls: ['./meeting-list.component.css']
})
export class MeetingListComponent {
  public filterMeetingName: string;
  public filterMeeting$ = new Subject<string>();

  constructor(private _meetingDataService: MeetingDataService) {
    this.filterMeeting$.subscribe(
      m => this.filterMeetingName = m);  
   }

  applyFilter(filter:string){
    this.filterMeetingName = filter;
  }

  get meetings(): Meeting[]{
    return this._meetingDataService.meetings;
  }

  addNewMeeting(meeting){
    this._meetingDataService.addNewMeeting(meeting);
  }
}