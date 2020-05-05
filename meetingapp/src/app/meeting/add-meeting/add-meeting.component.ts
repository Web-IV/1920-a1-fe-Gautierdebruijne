import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Meeting} from '../meeting.model'; 
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-add-meeting',
  templateUrl: './add-meeting.component.html',
  styleUrls: ['./add-meeting.component.css']
})
export class AddMeetingComponent implements OnInit {
  public meeting: FormGroup;
  @Output() public newMeeting = new EventEmitter<Meeting>();

  constructor() { }

  ngOnInit() {
    this.meeting = new FormGroup({
      name: new FormControl('meeting')
    })
  }

  // addMeeting(meetingName: HTMLInputElement): boolean{
  //   const meeting = new Meeting(meetingName.value, []);
  //   this.newMeeting.emit(meeting);
  //   return false;
  // }

  onSubmit(){
    this.newMeeting.emit(new Meeting(this.meeting.value.name));
  }
};
