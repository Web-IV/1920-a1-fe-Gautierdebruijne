import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { MeetingListComponent } from './meeting/meeting-list/meeting-list.component';
import { AddMeetingComponent } from './meeting/add-meeting/add-meeting.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { MeetingDetailComponent } from './meeting/meeting-detail/meeting-detail.component';
import { MeetingResolver } from './meeting/MeetingResolver';

const appRoutes: Routes = [
  {path: 'meeting/list', component: MeetingListComponent},
  {path: 'meeting/add', component: AddMeetingComponent},
  {path: 'meeting/detail/:id', component: MeetingDetailComponent, resolve: {meeting: MeetingResolver}},
  {path: '', redirectTo: 'meeting/list', pathMatch: 'full'},
  {path: '**', component: PageNotFoundComponent}
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
