import {AfterViewInit, Component, Input, OnInit, ViewChild} from '@angular/core';
import {NgForm} from '@angular/forms';
const DAYS: string[] = [
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday'
];

@Component({
  selector: 'app-test-box',
  templateUrl: './test-box.component.html',
  styleUrls: ['./test-box.component.css']
})

export class TestBoxComponent implements OnInit, AfterViewInit {

  days = DAYS;
  @ViewChild('f', {static: false}) form;
  @Input() appWeek: string;
  constructor() {}

  ngOnInit() {
  }

  getWeek() {
    if (this.appWeek != null) {
      return new Date(this.appWeek);
    }

    const date: Date = new Date();
    return new Date(date.getFullYear(), date.getMonth(), date.getDate() - date.getDay());
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
        const weekday = this.days[day - 1];
        document.getElementById(weekday).focus();
    }

    setTimeout(() => this.loadContent(), 500);
  }

  loadContent() {
    const content = JSON.parse(localStorage.getItem(this.getWeek().toDateString()));
    for (const day1 of DAYS) {
      if (content == null || content[day1] == null || content[day1] === '') {
        this.form.controls[day1].setValue('');
      } else {
        this.form.controls[day1].setValue(content[day1]);
      }
    }
  }

}
