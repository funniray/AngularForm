import {Injectable} from '@angular/core';
import {NgForm} from '@angular/forms';
import {PdfMakeWrapper} from 'pdfmake-wrapper';
import {QUESTIONS} from './test-box/form-inputs';
import {InputType} from './test-box/input-type.enum';

@Injectable({
  providedIn: 'root'
})
export class PrintFormService {

  constructor() { }

  printForm(f: NgForm, week: string) {
    const pdf: PdfMakeWrapper = new PdfMakeWrapper();
    pdf.add({text: 'Professional Internship Program\nWeekly Report', alignment: 'center', size: 24, bold: true});
    pdf.add({text: [{text: 'Name: ', bold: true}, {text: window.prompt('What is your name?')}]});
    pdf.add({text: [{text: 'Site: ', bold: true}, {text: window.prompt('What is your site name?')}]});
    pdf.add({text: [{text: `Beginning of Week: `, bold: true}, {text: week}]});
    pdf.add('\nPlease document in detail the activities in which you participated, specific incidents you observed, and any research' +
      ' conducted during this week. Hours at the internship should be rounded to the nearest 1/4th hour');
    for (const question of QUESTIONS) {
      const control = f.controls[question.id];
      const hours = f.controls[question.id + '-time'];
      if (question.type === InputType.NUMBER) {
        pdf.add({text: [{text: `\n${question.name} `, bold: true}, {text: control.value}]});
      } else if (question.type === InputType.DAY && (control.value === '' || control.value === undefined)) {
        continue;
      } else {
        if (question.type === InputType.DAY && hours !== undefined) {
          pdf.add({text: [{text: `\n${question.name}`, bold: true}, {text: ` Worked ${hours.value} hours`}]});
        } else {
          pdf.add({text: `\n${question.name}`, bold: true});
        }
        pdf.add({text: control.value});
      }
    }
    pdf.add({text: '\nMentor Comments (Optional):', bold: true});
    pdf.add('_'.repeat(95 * 3));
    pdf.add('\nIntern\'s Signature: __________________________________________         Date: ___________');
    pdf.add('\nI verify that the above information, to the best of my knowledge, is correct');
    pdf.add('Mentor\'s Signature: ___________________________________________         Date: ___________');
    pdf.create().print();
  }
}
