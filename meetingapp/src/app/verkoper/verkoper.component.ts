import { Component, OnInit , Input} from '@angular/core';

@Component({
  selector: 'app-verkoper',
  templateUrl: './verkoper.component.html',
  styleUrls: ['./verkoper.component.css']
})
export class VerkoperComponent implements OnInit {
  @Input() name : string;

  constructor() { }

  ngOnInit(): void {
  }

}
