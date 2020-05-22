import { Injectable } from '@angular/core';
import { Meeting } from './meeting.model';
import { HttpClient, HttpErrorResponse, HttpParams, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable, of, throwError, BehaviorSubject } from 'rxjs';
import { map, tap, delay, catchError, switchMap, shareReplay } from 'rxjs/operators';
import { MatDatepicker } from '@angular/material/datepicker';
import { Verkoper } from './verkoper.model';

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

  getMeeting$(id:number):Observable<Meeting>{
    return this.http
      .get(`${environment.apiUrl}/meetings/${id}`)
      .pipe(catchError(this.handleError), map(Meeting.fromJSON));
  }

  getMeetings$(name?:string){
    return this._reloadMeetings$.pipe(
      switchMap(() => this.fetchMeetings$(name))
    );
  }

  getVerkopers$(id:number){
    return this.http.get(`${environment.apiUrl}/meetings/${id}/verkopers`).pipe(
      map((list:any[]): Verkoper[] => list.map(Verkoper.fromJSON))
    );
  }

  fetchMeetings$(name?:string, verkoper?: string, date?: string){
    let params = new HttpParams();
    params = name ? params.append('name', name) : params;
    params = verkoper ? params.append('verkoperName', verkoper) : params;
    params = date ? params.append('date', date) : params;

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

  // updateMeeting(meeting: Meeting){
  //   return this.http.put<void>(`${environment.apiUrl}/meetings/${meeting.id}`, meeting, {
  //     headers: new HttpHeaders({
  //       'Content Type': 'application/json'
  //     })
  //   }).pipe(catchError((err) => {
  //     return throwError(err);
  //   })
  //   );
  // }

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
