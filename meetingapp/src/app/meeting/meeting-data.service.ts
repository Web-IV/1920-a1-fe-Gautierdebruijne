import { Injectable } from '@angular/core';
import { Meeting } from './meeting.model';
import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable, of, throwError, BehaviorSubject } from 'rxjs';
import { map, tap, delay, catchError, switchMap, shareReplay } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})

export class MeetingDataService {
  private _reloadMeetings$ = new BehaviorSubject<boolean>(true);

  constructor(private http: HttpClient) {}

  get meetings$(): Observable<Meeting[]>{
    return this.http.get(`${environment.apiUrl}/meetings/`).pipe(
        shareReplay(1),
        catchError(this.handleError),
        map((list:any[]): Meeting[] => list.map(Meeting.fromJSON))
    );
  } 

  getMeeting$(id:string):Observable<Meeting>{
    return this.http
      .get(`${environment.apiUrl}/meetings/${id}`)
      .pipe(catchError(this.handleError), map(Meeting.fromJSON));
  }

  getMeetings$(name?:string, verkoper?: string){
    return this._reloadMeetings$.pipe(
      switchMap(() => this.fetchMeetings$(name, verkoper))
    );
  }

  fetchMeetings$(name?:string, verkoper?: string){
    let params = new HttpParams();
    params = name ? params.append('name', name) : params;
    params = verkoper ? params.append('verkoperName', verkoper) : params;

    return this.http.get(`${environment.apiUrl}/meetings/`, {params}).pipe(
      catchError(this.handleError),
      map((list:any[]): Meeting[] => list.map(Meeting.fromJSON))
    );
  }

  addNewMeeting(meeting: Meeting){
    return this.http.post(`${environment.apiUrl}/meetings/`, meeting.toJSON())
    .pipe(catchError(this.handleError), map(Meeting.fromJSON))
    .pipe(catchError((err) => {
      return throwError(err);
    }),
      tap((m: Meeting) => {
        this._reloadMeetings$.next(true);
      })
    );
  }

  deleteMeeting(meeting: Meeting){
    return this.http.delete(`${environment.apiUrl}/meetings/${meeting.id}`)
    .pipe(catchError(this.handleError))
    .subscribe(() => {
      this._reloadMeetings$.next(true);
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
