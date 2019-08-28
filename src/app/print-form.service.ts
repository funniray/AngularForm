import { Injectable } from '@angular/core';
import {NgForm} from '@angular/forms';
import {PdfMakeWrapper} from 'pdfmake-wrapper';

@Injectable({
  providedIn: 'root'
})
export class PrintFormService {

  constructor() { }

  printForm(f: NgForm, week: string) {
    const pdf: PdfMakeWrapper = new PdfMakeWrapper();
    pdf.add({text: 'Professional Internship Program\nWeekly Report', alignment: 'center', size: 24, bold: true});
    pdf.add({text: [{text: '\nName: ', bold: true}, {text: window.prompt('What is your name?')}]});
    pdf.add({text: [{text: '\nSite: ', bold: true}, {text: window.prompt('What is your site name?')}]});
    pdf.add({text: [{text: `\nBeginning of Week: `, bold: true}, {text: week}]});
    pdf.add('\nPlease document in detail the activities in which you participated, specific incidents you observed, and any research' +
      ' conducted during this week. Hours at the internship should be rounded to the nearest 1/4th hour');
    for (const controlKey in f.controls) {
      const control = f.controls[controlKey];
      if (controlKey === 'Hours') {
        pdf.add({text: [{text: '\nHours: ', bold: true}, {text: control.value}]});
        continue;
      }
      pdf.add({text: `\n${controlKey}:`, bold: true});
      pdf.add({text: control.value});
    }
    pdf.add('\nIntern\'s Signature: __________________________________________         Date: ___________');
    pdf.add('Mentor\'s Signature: __________________________________________         Date: ___________');
    pdf.create().print();
  }
}
