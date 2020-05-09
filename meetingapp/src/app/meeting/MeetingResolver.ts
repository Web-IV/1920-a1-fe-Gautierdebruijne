import { Injectable } from "@angular/core";
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Meeting } from './meeting.model';
import { MeetingDataService } from './meeting-data.service';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})

export class MeetingResolver implements Resolve<Meeting>{
    constructor(private meetingDataService: MeetingDataService){}
    
    resolve(
        route: ActivatedRouteSnapshot, 
        state: RouterStateSnapshot): Observable<Meeting> {
            return this.meetingDataService.getMeeting$(route.params['id']);
    }
    
}