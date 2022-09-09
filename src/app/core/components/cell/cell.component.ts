import { Component, Input, OnInit } from '@angular/core';
import { ValuesService } from '../../services/values.service';

@Component({
  selector: 'app-cell',
  templateUrl: './cell.component.html',
  styleUrls: ['./cell.component.scss'],
})
export class CellComponent implements OnInit {
  @Input() public x: number;
  @Input() public y: number;
  public content: number;

  constructor(private valuesService: ValuesService) {
    this.x = 0;
    this.y = 0;
    this.content = 0;
  }

  ngOnInit(): void {
    this.valuesService.grid.subscribe((values) => {
      this.content = values[this.x][this.y];
    });
  }
}
