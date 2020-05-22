import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Meeting} from '../meeting.model'; 
import { FormGroup, FormControl, Validators, FormBuilder, FormArray } from '@angular/forms';
import { Verkoper } from '../verkoper.model';
import { debounceTime, distinctUntilChanged, last, catchError } from 'rxjs/operators';
import { MeetingDataService } from '../meeting-data.service';
import { EMPTY } from 'rxjs';
import { ActivatedRoute } from '@angular/router';

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
  public errorMessage: string = '';
  public confirmationMessage: string = '';
  public readonly names = ['Jo de Bruijne', 'Gunter van Damme', 'Stefaan Durwael', 'Benny Cools', 'Pascale Engels']


  constructor(private fb: FormBuilder, private _meetingDataService: MeetingDataService, private route: ActivatedRoute) { }

  get verkopers(): FormArray{
    return <FormArray>this.meeting.get('verkopers');
  }

  ngOnInit() {
    this.meeting = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(2)]],
      verkopers: this.fb.array([this.createVerkopers()]),
      date: new Date()
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

      // this.route.paramMap.subscribe(params => {
      //   const meetingId = +params.get('id');
      //   if(meetingId){
      //     this.getMeeting(meetingId);
      //   }
      // });
  }

  // getMeeting(id: number){
  //   this._meetingDataService.getMeeting$(id).subscribe(
  //     (m: Meeting) => this.editMeeting(m),
  //     catchError((err) => {
  //       this.errorMessage = err;
  //       return EMPTY;
  //     })
  //   );
  // }

  // editMeeting(meeting: Meeting){
  //   this.meeting = this.fb.group({
  //     name: [meeting.name, [Validators.required, Validators.minLength(2)]],
  //     verkopers: this.fb.array([this.createVerkopers()]),
  //     date: [meeting.date]
  //   });
  // }

  createVerkopers() : FormGroup {
    return this.fb.group({
      name: [''],
      title: ['']
    }, { validator: validateVerkoperName }
    );
  }

  getVerkopers(id: number) {
    return this._meetingDataService.getVerkopers$(id);
  }

  onSubmit(){
    let verkopers = this.meeting.value.verkopers.map(Verkoper.fromJSON);

    verkopers = verkopers.filter((v) => v.name.length >= 2);
    this._meetingDataService
      .addNewMeeting(new Meeting(this.meeting.value.name, verkopers, this.meeting.value.date))
      .pipe(
        catchError((err) => {
          this.errorMessage = err;
          return EMPTY;
        })
      )
      .subscribe((m: Meeting) => {
        this.confirmationMessage = `A new meeting for ${m.name} was succesfully added!`;
      });
    
    this.meeting = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(2)]],
      verkopers: this.fb.array([this.createVerkopers()]),
      date: ['']
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
