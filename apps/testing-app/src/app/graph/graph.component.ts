import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';

@Component({
  selector: 'ng-multiple-components-state-graph',
  templateUrl: './graph.component.html',
  styleUrls: ['./graph.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GraphComponent implements OnChanges {
  @Input() nodes: string[] = [];
  graphNodes: string[] = [];

  @Output() saved = new EventEmitter<string[]>();

  constructor() {}

  ngOnChanges(simpleChanges: SimpleChanges) {
    if (simpleChanges['nodes']) {
      this.graphNodes = [...simpleChanges['nodes'].currentValue];
    }
  }

  addNode(): void {
    this.graphNodes.push('Random Node Number ' + (this.graphNodes.length + 1));
  }

  save(): void {
    this.saved.emit(this.graphNodes);
  }
}
