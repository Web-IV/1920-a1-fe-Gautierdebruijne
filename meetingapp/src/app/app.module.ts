import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { MeetingModule } from './meeting/meeting.module';
import { MaterialModule } from './material/material.module';
import { RouterModule, Routes } from '@angular/router';
import { MeetingListComponent } from './meeting/meeting-list/meeting-list.component';
import { AddMeetingComponent } from './meeting/add-meeting/add-meeting.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';

const appRoutes: Routes = [
  {path: 'meeting/list', component: MeetingListComponent},
  {path: 'meeting/add', component: AddMeetingComponent},
  {path: '', redirectTo: 'meeting/list', pathMatch: 'full'}
];

@NgModule({
  declarations: [
    AppComponent,
    PageNotFoundComponent
  ],
  imports: [
    BrowserModule,
    MeetingModule,
    MaterialModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
