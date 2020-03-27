import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VerkoperComponent } from './verkoper/verkoper.component';
import { MeetingComponent } from './meeting/meeting.component';
import { MaterialModule } from './../material/material.module';
import { MeetingListComponent } from './meeting-list/meeting-list.component';

@NgModule({
  declarations: [VerkoperComponent, MeetingComponent, MeetingListComponent],
  imports: [CommonModule, MaterialModule],
  exports: [MeetingListComponent]
})
export class MeetingModule { }
