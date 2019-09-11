import {FormInput} from './form-input';
import {InputType} from './input-type.enum';

export const QUESTIONS: FormInput[] = [
  {id: 'Sunday', name: 'Sunday:', type: InputType.DAY, dayOffset: 0},
  {id: 'Monday', name: 'Monday:', type: InputType.DAY, dayOffset: 1},
  {id: 'Tuesday', name: 'Tuesday:', type: InputType.DAY, dayOffset: 2},
  {id: 'Wednesday', name: 'Wednesday:', type: InputType.DAY, dayOffset: 3},
  {id: 'Thursday', name: 'Thursday:', type: InputType.DAY, dayOffset: 4},
  {id: 'Friday', name: 'Friday:', type: InputType.DAY, dayOffset: 5},
  {id: 'Saturday', name: 'Saturday:', type: InputType.DAY, dayOffset: 6},
  {id: 'Hours', name: 'Hours:', type: InputType.NUMBER},
  {id: 'knowledge', name: 'What new knowledge or skills did you acquire while interning this week?', type: InputType.QUESTION},
  {id: 'experiences', name: 'List any pleasant or unpleasant experiences which may have occurred this week during your internship.',
    type: InputType.QUESTION}
];
