import {Injectable} from '@angular/core';
import {Observable, of} from 'rxjs';
import {QUESTIONS} from './form-inputs';
import {NgForm} from '@angular/forms';
import {InputType} from './input-type.enum';

@Injectable({
  providedIn: 'root'
})
export class AppDataHandlerService {

  constructor() { }

  getData(week: Date): Observable<object[]> {
    return of(JSON.parse(localStorage.getItem(week.toDateString())));
  }

  setData(week: Date, data: NgForm) {
    const newData = {};
    for (const question of QUESTIONS) {
      if (question.type === InputType.DAY) {
        newData[question.id] = {text: data.controls[question.id].value, time: data.controls[`${question.id}-time`].value};
      } else {
        newData[question.id] = {text: data.controls[question.id].value};
      }
    }
    localStorage.setItem(week.toDateString(), JSON.stringify(newData));
  }
}
