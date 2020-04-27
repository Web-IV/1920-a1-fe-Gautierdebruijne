import { Injectable } from '@angular/core';
import { Meeting } from './meeting.model';
import { MEETINGS } from './mock-meetings';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable, of, throwError } from 'rxjs';
import { map, tap, delay, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})

export class MeetingDataService {
  constructor(private http: HttpClient) { }

  get meetings$(): Observable<Meeting[]>{
    return this.http.get(`${environment.apiUrl}/meetings/`).pipe(
        catchError(this.handleError),
        map(
          (list:any[]): Meeting[] => list.map(Meeting.fromJSON)
      )
    );
  }

  handleError(err: any): Observable<never> {
    let errorMessage: string;
    if(err instanceof HttpErrorResponse){
      errorMessage = `'${err.status} ${err.statusText}' when accessing '${err.url}'`;
    } else {
      errorMessage = `an unknown error has occurred ${err}`;
    }

    console.error(err);
    return throwError(errorMessage);
  }

  // addNewMeeting(meeting: Meeting){
  //   this._meetings = [...this._meetings, meeting];
  // }
}
