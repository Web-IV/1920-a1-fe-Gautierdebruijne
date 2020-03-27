import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-meeting',
  templateUrl: './meeting.component.html',
  styleUrls: ['./meeting.component.css']
})
export class MeetingComponent implements OnInit {
  name: string;
  verkopers: string[];
  dateAdded: Date;


  constructor() { 
    this.name = "fam. Engels";
    this.verkopers = ["Jo de Bruijne", "Stefaan Durwael"];
    this.dateAdded = new Date();
  }

  ngOnInit(): void {
  }

}
