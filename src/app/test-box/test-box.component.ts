import {AfterViewInit, Component, Input, OnInit, ViewChild} from '@angular/core';
import {NgForm} from '@angular/forms';
import {PrintFormService} from '../print-form.service';

const QUESTIONS: string[] = [
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Hours',
  'What new knowledge or skills did you acquire while interning this week',
  'List any pleasant or unpleasant experiences which may have occurred this week during your internship'
];

@Component({
  selector: 'app-test-box',
  templateUrl: './test-box.component.html',
  styleUrls: ['./test-box.component.css']
})

export class TestBoxComponent implements OnInit, AfterViewInit {

  questions = QUESTIONS;
  @ViewChild('f', {static: false}) form;
  @Input() appWeek: string;
  constructor(printFormService: PrintFormService) {}

  ngOnInit() {
  }

  getWeek() {
    if (this.appWeek != null) {
      return new Date(this.appWeek);
    }

    const date: Date = new Date();
    const newDate: Date = new Date(date.getFullYear(), date.getMonth(), date.getDate() - date.getDay());
    this.appWeek = newDate.toDateString();
    return newDate;
  }

  onFormSubmit(f: NgForm) {
    console.log('Submitted');
    localStorage.setItem(this.getWeek().toDateString(), JSON.stringify(f.value));
  }

  setDate(week: string) {
    this.onFormSubmit(this.form);
    this.appWeek = week;
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
        document.getElementById(weekday).focus();
    }

    setTimeout(() => this.loadContent(), 500);
  }

  loadContent() {
    const content = JSON.parse(localStorage.getItem(this.getWeek().toDateString()));
    for (const question of QUESTIONS) {
      if (content == null || content[question] == null || content[question] === '') {
        this.form.controls[question].setValue('');
      } else {
        this.form.controls[question].setValue(content[question]);
      }
    }
  }

}
