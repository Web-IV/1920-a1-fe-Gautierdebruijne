import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VerkoperComponent } from './verkoper/verkoper.component';
import { MeetingComponent } from './meeting/meeting.component';


@NgModule({
  declarations: [VerkoperComponent, MeetingComponent],
  imports: [
    CommonModule
  ],
  exports: [
    MeetingComponent
  ]
})
export class MeetingModule { }
