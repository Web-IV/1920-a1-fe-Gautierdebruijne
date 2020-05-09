import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VerkoperComponent } from './verkoper/verkoper.component';
import { MeetingComponent } from './meeting/meeting.component';
import { MaterialModule } from './../material/material.module';
import { MeetingListComponent } from './meeting-list/meeting-list.component';
import { AddMeetingComponent } from './add-meeting/add-meeting.component';
import { MeetingFilterPipe } from './meeting-filter.pipe';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { MeetingDetailComponent } from './meeting-detail/meeting-detail.component';
import { Routes, RouterModule } from '@angular/router';
import { MeetingResolver } from './MeetingResolver';

const routes: Routes = [
  {path: 'meeting/list', component: MeetingListComponent},
  {path: 'meeting/add', component: AddMeetingComponent},
  {path: 'meeting/detail/:id', component: MeetingDetailComponent, resolve: {meeting: MeetingResolver}}];

@NgModule({
  declarations: [VerkoperComponent, MeetingComponent, MeetingListComponent, AddMeetingComponent, MeetingFilterPipe, MeetingDetailComponent],
  imports: [CommonModule, HttpClientModule, MaterialModule, ReactiveFormsModule, RouterModule.forChild(routes)],
  exports: [MeetingListComponent, AddMeetingComponent]
})
export class MeetingModule { }
