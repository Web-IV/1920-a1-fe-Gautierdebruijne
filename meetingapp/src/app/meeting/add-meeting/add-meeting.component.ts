import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Meeting} from '../meeting.model'; 
import { FormGroup, FormControl, Validators } from '@angular/forms';

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
      name: new FormControl('', [Validators.required, Validators.minLength(3)])
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

  getErrorMessage(errors:any):string{
    if(errors.required){
      return 'is required';
    }else if(errors.minLength){
      return `needs at least ${errors.minLength.requiredLength} characters (got ${errors.minLength.requiredLength})`;
    }
  }
};
