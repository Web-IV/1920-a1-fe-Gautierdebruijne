import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Meeting} from '../meeting.model'; 
import { FormGroup, FormControl, Validators, FormBuilder, FormArray } from '@angular/forms';
import { Verkoper } from '../verkoper.model';
import { debounceTime, distinctUntilChanged, last } from 'rxjs/operators';
import { MeetingDataService } from '../meeting-data.service';

function validateVerkoperName(control: FormGroup): {
  [key:string]: any} {
    if(
      control.get('title').value.length >= 1 &&
      control.get('name').value.length < 2 
      ){
      return { titleNoName: true };
    }
   return null; 
}

@Component({
  selector: 'app-add-meeting',
  templateUrl: './add-meeting.component.html',
  styleUrls: ['./add-meeting.component.css']
})

export class AddMeetingComponent implements OnInit {
  public meeting: FormGroup;
  public readonly prefix = ['Dhr.', 'Mvr.', 'Fam. '];

  constructor(private fb: FormBuilder, private _meetingDataService: MeetingDataService) { }

  get verkopers(): FormArray{
    return <FormArray>this.meeting.get('verkopers');
  }

  ngOnInit() {
    this.meeting = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(2)]],
      verkopers: this.fb.array([this.createVerkopers()])
    });

    this.verkopers.valueChanges
      .pipe(debounceTime(400), distinctUntilChanged())
      .subscribe(v => {
        const lastVerkoper = v[v.length - 1];

        if(lastVerkoper.name && lastVerkoper.name.length >= 2) {
          this.verkopers.push(this.createVerkopers());
        } else if (v.length >= 2){
          const secondToLast = v[v.length - 2];
          if(
            !lastVerkoper.name &&
            !lastVerkoper.title &&
            (!secondToLast.name || secondToLast.name.length < 2)){
            this.verkopers.removeAt(this.verkopers.length - 1);
          }
        }
      });
  }

  createVerkopers() : FormGroup {
    return this.fb.group({
      name: [''],
      title: ['']
    }, { validator: validateVerkoperName }
    );
  }

  onSubmit(){
    let verkopers = this.meeting.value.verkopers.map(Verkoper.fromJSON);
    verkopers = verkopers.filter(v => v.name.length >= 2);
    this._meetingDataService.addNewMeeting(new Meeting(this.meeting.value.name, verkopers));

    this.meeting = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(2)]],
      verkopers: this.fb.array([this.createVerkopers()])
    });
  }

  getErrorMessage(errors:any):string{
    if(!errors){
      return null;
    }

    if(errors.required){
      return 'is required';
    }else if(errors.minLength){
      return `needs at least ${errors.minlength.requiredLength} characters (got ${errors.minlength.actualLength})`;
    }else if(errors.titleNoName){
      return `when using a title, a name is required`;
    }
  }
}
