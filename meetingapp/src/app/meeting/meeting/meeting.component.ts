import { Component, OnInit, Input } from '@angular/core';
import { Meeting } from '../meeting.model';
import { MeetingDataService } from '../meeting-data.service';
import { MeetingResolver } from '../MeetingResolver';
import { MeetingDetailComponent } from '../meeting-detail/meeting-detail.component';

@Component({
  selector: 'app-meeting',
  templateUrl: './meeting.component.html',
  styleUrls: ['./meeting.component.css']
})
export class MeetingComponent implements OnInit {
  @Input() public meeting: Meeting;

  constructor(private _meetingDataService: MeetingDataService) {}

  ngOnInit(): void {
  }

  deleteMeeting(){
    this._meetingDataService.deleteMeeting(this.meeting);
  }

  getMeeting(id:number){
    this._meetingDataService.getMeeting$(id)
  }
}
