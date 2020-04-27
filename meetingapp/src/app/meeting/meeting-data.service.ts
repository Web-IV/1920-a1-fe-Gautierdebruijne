import { Injectable } from '@angular/core';
import { Meeting } from './meeting.model';
import { MEETINGS } from './mock-meetings';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { map, tap, delay } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})

export class MeetingDataService {
  constructor(private http: HttpClient) { }

  get meetings$(): Observable<Meeting[]>{
    return this.http.get(`${environment.apiUrl}/meetings/`).pipe(
        map(
          (list:any[]): Meeting[] => list.map(Meeting.fromJSON)
      )
    );
  }

  // addNewMeeting(meeting: Meeting){
  //   this._meetings = [...this._meetings, meeting];
  // }
}
