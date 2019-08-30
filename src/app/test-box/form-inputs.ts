import {FormInput} from './form-input';
import {InputType} from './input-type.enum';

export const QUESTIONS: FormInput[] = [
  {id: 'Monday', name: 'Monday:', type: InputType.DAY},
  {id: 'Tuesday', name: 'Tuesday:', type: InputType.DAY},
  {id: 'Wednesday', name: 'Wednesday:', type: InputType.DAY},
  {id: 'Thursday', name: 'Thursday:', type: InputType.DAY},
  {id: 'Friday', name: 'Friday:', type: InputType.DAY},
  {id: 'Other', name: 'Saturday-Sunday:', type: InputType.DAY},
  {id: 'Hours', name: 'Hours:', type: InputType.NUMBER},
  {id: 'knowledge', name: 'What new knowledge or skills did you acquire while interning this week?', type: InputType.QUESTION},
  {id: 'experiences', name: 'List any pleasant or unpleasant experiences which may have occurred this week during your internship.',
    type: InputType.QUESTION}
];
