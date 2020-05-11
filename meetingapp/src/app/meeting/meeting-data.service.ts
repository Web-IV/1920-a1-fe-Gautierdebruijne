import { Injectable } from '@angular/core';
import { Meeting } from './meeting.model';
import { MEETINGS } from './mock-meetings';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable, of, throwError, BehaviorSubject } from 'rxjs';
import { map, tap, delay, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})

export class MeetingDataService {
  private _meetings$ = new BehaviorSubject<Meeting[]>([]);
  private _meetings: Meeting[];

  constructor(private http: HttpClient) { 
    this.meetings$
    .pipe(catchError(err => {
      //Temporary fix
      this._meetings$.error(err);
      return throwError(err);
    })
    )
    .subscribe((meetings: Meeting[]) => {
      this._meetings = meetings;
      this._meetings$.next(this._meetings);
    });
  }

  get allMeetings$(): Observable<Meeting[]> {
    return this._meetings$;
  }

  get meetings$(): Observable<Meeting[]>{
    return this.http.get(`${environment.apiUrl}/meetings/`).pipe(
        catchError(this.handleError),
        map((list:any[]): Meeting[] => list.map(Meeting.fromJSON))
    );
  } 

  getMeeting$(id:string):Observable<Meeting>{
    return this.http
      .get(`${environment.apiUrl}/meetings/${id}`)
      .pipe(catchError(this.handleError), map(Meeting.fromJSON));
  }

  addNewMeeting(meeting: Meeting){
    return this.http.post(`${environment.apiUrl}/meetings/`, meeting.toJSON())
    .pipe(catchError(this.handleError), map(Meeting.fromJSON))
    .pipe(catchError((err) => {
      this._meetings$.error(err);
      return throwError(err);
    }),
      tap((m: Meeting) => {
        this._meetings = [...this._meetings, m];
        this._meetings$.next(this._meetings);
      })
    );
  }

  deleteMeeting(meeting: Meeting){
    return this.http.delete(`${environment.apiUrl}/meetings/${meeting.id}`)
    .pipe(catchError(this.handleError))
    .subscribe(() => {
      this._meetings = this._meetings.filter((m) => m.id != meeting.id);
      this._meetings$.next(this._meetings);
    });
  }

  handleError(err: any): Observable<never> {
    let errorMessage: string;
    
    if(err.error instanceof ErrorEvent){
      errorMessage = `An error occurred: ${err.error.message}`;
    } else if(err instanceof HttpErrorResponse){
      console.log(err);
      errorMessage = `'${err.status} ${err.statusText}' when accessing '${err.url}'`;
    } else {
      errorMessage = `an unknown error has occurred ${err}`;
    }
    
    return throwError(errorMessage);
  }

  
}
