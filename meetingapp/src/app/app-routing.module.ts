import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { MeetingListComponent } from './meeting/meeting-list/meeting-list.component';
import { AddMeetingComponent } from './meeting/add-meeting/add-meeting.component';

const appRoutes: Routes = [
  {path: 'meeting/list', component: MeetingListComponent},
  {path: 'meeting/add', component: AddMeetingComponent},
  {path: '', redirectTo: 'meeting/list', pathMatch: 'full'}
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
