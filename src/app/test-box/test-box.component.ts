import {AfterViewInit, Component, Input, OnInit, ViewChild} from '@angular/core';
import {NgForm} from '@angular/forms';
import {PrintFormService} from '../print-form.service';
import {InputType} from './input-type.enum';
import {QUESTIONS} from './form-inputs';
import {AppDataHandlerService} from './app-data-handler.service';
import {isNumber} from 'util';

@Component({
  selector: 'app-test-box',
  templateUrl: './test-box.component.html',
  styleUrls: ['./test-box.component.css']
})

export class TestBoxComponent implements OnInit, AfterViewInit {

  questions = QUESTIONS;
  @ViewChild('f', {static: false}) form;
  @Input() appWeek: Date;
  printFormService: PrintFormService;
  appDataHandlerService: AppDataHandlerService;
  inputType = InputType;

  constructor(printFormService: PrintFormService, appDataHandlerService: AppDataHandlerService) {
    this.printFormService = printFormService;
    this.appDataHandlerService = appDataHandlerService;
  }

  ngOnInit() {
  }

  getWeek() {
    if (this.appWeek != null) {
      this.appWeek = new Date(this.appWeek);
      return new Date(this.appWeek);
    }

    const date: Date = new Date();
    const newDate: Date = new Date(date.getFullYear(), date.getMonth(), date.getDate() - date.getDay());
    this.appWeek = newDate;
    return newDate;
  }

  formChange(f: NgForm) {
    let time = 0;
    for (const question of this.questions) {
      if (question.type !== this.inputType.DAY || f.controls[question.id + '-time'] === undefined) {
        continue;
      }
      if (isNumber(f.controls[question.id + '-time'].value)) {
        time += Number(f.controls[question.id + '-time'].value);
      }
    }
    f.controls.Hours.setValue(time);
    this.appDataHandlerService.setData(this.getWeek(), f);
  }

  setDate(week: string) {
    this.formChange(this.form);
    this.appWeek = new Date(week);
    this.loadContent();
  }

  ngAfterViewInit() {
    const date: Date = new Date();
    const day = date.getDay();
    switch (day) {
      case 0:
      case 6:
        return;
      default:
        const weekday = this.questions[day - 1];
        document.getElementById(weekday.id).focus();
    }

    setTimeout(() => this.loadContent(), 500);
  }

  async loadContent() {
    const content = await this.appDataHandlerService.getData(this.getWeek()).toPromise();
    for (const question of QUESTIONS) {
      if (content == null || (content[question.id] || content[question.name]) == null) {
        this.form.controls[question.id].setValue('');
        if (question.type === InputType.DAY) {
          this.form.controls[question.id + '-time'].setValue('');
        }
      } else {
        this.form.controls[question.id].setValue(content[question.id].text || content[question.name]);
        if (question.type === InputType.DAY) {
          this.form.controls[question.id + '-time'].setValue(content[question.id].time || '');
        }
      }
    }
  }

  getOffsetDay(offset: number) {
    const week = this.getWeek();
    return new Date(0, week.getMonth(), week.getDate() + offset).toDateString().replace(' 1900', '');
  }

}
