import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VerkoperComponent } from './verkoper/verkoper.component';
import { MeetingComponent } from './meeting/meeting.component';
import { MaterialModule } from './../material/material.module';
import { MeetingListComponent } from './meeting-list/meeting-list.component';
import { AddMeetingComponent } from './add-meeting/add-meeting.component';

@NgModule({
  declarations: [VerkoperComponent, MeetingComponent, MeetingListComponent, AddMeetingComponent],
  imports: [CommonModule, MaterialModule],
  exports: [MeetingListComponent]
})
export class MeetingModule { }
