import { Component, OnInit } from '@angular/core';
import { Meeting } from './../meeting.model';
import { MeetingDataService } from '../meeting-data.service';
import { Subject } from 'rxjs';
import { distinctUntilChanged, debounceTime, map } from 'rxjs/operators';
@Component({
  selector: 'app-meeting-list',
  templateUrl: './meeting-list.component.html',
  styleUrls: ['./meeting-list.component.css']
})
export class MeetingListComponent {
  public filterMeetingName: string;
  public filterMeeting$ = new Subject<string>();

  constructor(private _meetingDataService: MeetingDataService) {
    this.filterMeeting$
      .pipe(
        distinctUntilChanged(),
        debounceTime(200),
        map(v => v.toLowerCase()),
      )
      .subscribe(m => this.filterMeetingName = m);  
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