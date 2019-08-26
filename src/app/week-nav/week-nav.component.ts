import {Component, EventEmitter, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-week-nav',
  templateUrl: './week-nav.component.html',
  styleUrls: ['./week-nav.component.css']
})
export class WeekNavComponent implements OnInit {

  @Output() newWeek = new EventEmitter<string>();

  weekOffset = 0;

  nextWeek() {
    this.weekOffset++;
    this.reloadContent();
  }

  lastWeek() {
    this.weekOffset--;
    this.reloadContent();
  }

  reloadContent() {
    this.newWeek.emit(this.getOffsetWeek().toDateString());
  }

  getOffsetWeek() {
    const date: Date = new Date();
    return new Date(date.getFullYear(), date.getMonth(), date.getDate() - date.getDay() - (7 * -1 * this.weekOffset));
  }

  ngOnInit() {
  }

}
