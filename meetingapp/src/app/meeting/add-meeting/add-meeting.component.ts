import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Meeting} from '../meeting.model'; 

@Component({
  selector: 'app-add-meeting',
  templateUrl: './add-meeting.component.html',
  styleUrls: ['./add-meeting.component.css']
})
export class AddMeetingComponent implements OnInit {
  @Output() public newMeeting = new EventEmitter<Meeting>();

  constructor() { }

  ngOnInit(): void {
  }

  addMeeting(meetingName: HTMLInputElement): boolean{
    const meeting = new Meeting(meetingName.value, []);
    this.newMeeting.emit(meeting);
    return false;
  }
}
