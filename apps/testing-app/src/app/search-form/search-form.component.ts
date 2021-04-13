import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'ng-multiple-components-state-search-form',
  templateUrl: './search-form.component.html',
  styleUrls: ['./search-form.component.css']
})
export class SearchFormComponent {
  @Input() textValue = '';
  @Output() textValueChanged = new EventEmitter<Event>();
}
