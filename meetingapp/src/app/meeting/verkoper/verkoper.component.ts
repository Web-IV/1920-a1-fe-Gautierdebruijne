import { Component, OnInit , Input} from '@angular/core';
import { Observable } from 'rxjs';
import { Verkoper } from '../verkoper.model';

@Component({
  selector: 'app-verkoper',
  templateUrl: './verkoper.component.html',
  styleUrls: ['./verkoper.component.css']
})
export class VerkoperComponent implements OnInit{
  @Input() verkoper: Verkoper;

  constructor() {}

  ngOnInit() {}
}
