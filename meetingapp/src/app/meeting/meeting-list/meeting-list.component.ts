import { Component, OnInit } from '@angular/core';
import { Meeting } from './../meeting.model';
import { MeetingDataService } from '../meeting-data.service';
import { Subject, Observable, EMPTY } from 'rxjs';
import { distinctUntilChanged, debounceTime, map, catchError } from 'rxjs/operators';
@Component({
  selector: 'app-meeting-list',
  templateUrl: './meeting-list.component.html',
  styleUrls: ['./meeting-list.component.css']
})
export class MeetingListComponent implements OnInit{
  public filterMeetingName: string;
  public filterMeeting$ = new Subject<string>();
  private _fetchMeetings$:  Observable<Meeting[]>
  public errorMessage: string = '';

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

  ngOnInit():void {
    this._fetchMeetings$ = this._meetingDataService.meetings$.pipe(
      catchError(err => {
        this.errorMessage = err;
        return EMPTY;
      })
    );
  }
  
}