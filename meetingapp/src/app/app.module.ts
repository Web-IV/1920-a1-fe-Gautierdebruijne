import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { MeetingModule } from './meeting/meeting.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    MeetingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
