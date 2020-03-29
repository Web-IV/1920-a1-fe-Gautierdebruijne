import { Component, OnInit } from '@angular/core';
import { Meeting } from './../meeting.model';
import { MeetingDataService } from '../meeting-data.service';
import { Subject, Observable } from 'rxjs';
import { distinctUntilChanged, debounceTime, map } from 'rxjs/operators';
@Component({
  selector: 'app-meeting-list',
  templateUrl: './meeting-list.component.html',
  styleUrls: ['./meeting-list.component.css']
})
export class MeetingListComponent implements OnInit{
  public filterMeetingName: string;
  public filterMeeting$ = new Subject<string>();
  private _fetchMeetings$:  Observable<Meeting[]> = this._meetingDataService.meetings$;

  constructor(private _meetingDataService: MeetingDataService) {
    this.filterMeeting$.pipe(
      distinctUntilChanged(),
      debounceTime(200),
      map(v => v.toLowerCase())
    ).subscribe(v => (this.filterMeetingName = v));
  }

  applyFilter(filter:string){
    this.filterMeetingName = filter;
  }

  get meetings$(): Observable<Meeting[]>{
    return this._fetchMeetings$;
  }

  ngOnInit():void {}

  // addNewMeeting(meeting){
  //   this._meetingDataService.addNewMeeting(meeting);
  // }
}