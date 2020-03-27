import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VerkoperComponent } from './verkoper/verkoper.component';
import { MeetingComponent } from './meeting/meeting.component';
import { MaterialModule } from './../material/material.module';

@NgModule({
  declarations: [VerkoperComponent, MeetingComponent],
  imports: [
    CommonModule,
    MaterialModule
  ],
  exports: [
    MeetingComponent
  ]
})
export class MeetingModule { }
