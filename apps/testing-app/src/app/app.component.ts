import { Component } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { selectFormIds } from './+state/forms.selectors';
import { of, Subject } from 'rxjs';
import { map, repeatWhen } from 'rxjs/operators';
import { AppState } from './app.module';

const s4 = () => {
  return Math.floor((1 + Math.random()) * 0x10000)
    .toString(16)
    .substring(1);
}


@Component({
  selector: 'ng-multiple-components-state-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  forms$ = this.store.pipe(select(selectFormIds));

  newClicked = new Subject();
  nextFormId$ = of('').pipe(
    map(s4),
    repeatWhen(() => this.newClicked)
  );

  constructor(private store: Store<AppState>) {
  }

}
