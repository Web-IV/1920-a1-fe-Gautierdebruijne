import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VerkoperComponent } from './verkoper/verkoper.component';
import { MeetingComponent } from './meeting/meeting.component';
import { MaterialModule } from './../material/material.module';
import { MeetingListComponent } from './meeting-list/meeting-list.component';
import { AddMeetingComponent } from './add-meeting/add-meeting.component';
import { MeetingFilterPipe } from './meeting-filter.pipe';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [VerkoperComponent, MeetingComponent, MeetingListComponent, AddMeetingComponent, MeetingFilterPipe],
  imports: [CommonModule, HttpClientModule, MaterialModule],
  exports: [MeetingListComponent]
})
export class MeetingModule { }
