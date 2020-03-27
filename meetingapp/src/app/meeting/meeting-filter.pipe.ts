import { Pipe, PipeTransform } from '@angular/core';
import { Meeting } from './meeting.model';

@Pipe({
  name: 'meetingFilter'
})
export class MeetingFilterPipe implements PipeTransform {

  transform(meetings: Meeting[], name:string): Meeting[] {
    if(!name || name.length === 0){
      return meetings;
    }

    return meetings.filter(m => m.name.toLowerCase().startsWith(name.toLowerCase()));
  }
}