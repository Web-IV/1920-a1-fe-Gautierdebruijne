import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MeetingDataService } from '../meeting-data.service';
import { Meeting } from '../meeting.model';

@Component({
  selector: 'app-meeting-detail',
  templateUrl: './meeting-detail.component.html',
  styleUrls: ['./meeting-detail.component.css']
})
export class MeetingDetailComponent implements OnInit {
  public meeting: Meeting;

  constructor(private route: ActivatedRoute, private meetingDataService: MeetingDataService) { }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    this.meetingDataService.getMeeting$(id).subscribe(item => this.meeting = item);
  }

}
