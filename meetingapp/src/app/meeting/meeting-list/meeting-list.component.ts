import { Component, OnInit } from '@angular/core';
import { Meeting } from './../meeting.model';
import { MeetingDataService } from '../meeting-data.service';
import { Subject, Observable, EMPTY } from 'rxjs';
import { distinctUntilChanged, debounceTime, map, catchError, switchMap } from 'rxjs/operators';
import { ActivatedRoute, Router } from '@angular/router';
@Component({
  selector: 'app-meeting-list',
  templateUrl: './meeting-list.component.html',
  styleUrls: ['./meeting-list.component.css']
})
export class MeetingListComponent implements OnInit{
  public filterMeetingName: string = '';
  public filterMeeting$ = new Subject<string>();
  private _fetchMeetings$:  Observable<Meeting[]>
  public errorMessage: string = '';

  constructor(private _meetingDataService: MeetingDataService, private _router: Router, private _route:ActivatedRoute) {
    this.filterMeeting$
      .pipe(distinctUntilChanged(), debounceTime(250))
      .subscribe((value) => {
        const params = value ? {queryParams: {filter: value}} : undefined;
        this._router.navigate(['/meeting/list'], params);
      });

    this._fetchMeetings$ = this._route.queryParams
      .pipe(
      switchMap(params => {
        if(params['filter']){
          this.filterMeetingName = params['filter'];
        }

        return this._meetingDataService.getMeetings$(params['filter']);
      })
    )
    .pipe(catchError((err) => {
        this.errorMessage = err;
        return EMPTY;
        })
      )
  }

  applyFilter(filter:string){
    this.filterMeetingName = filter;
  }

  get meetings$(): Observable<Meeting[]>{
    return this._fetchMeetings$;
  }

  ngOnInit():void {}
}