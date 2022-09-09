import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ValuesService {
  public grid: BehaviorSubject<number[][]>;
  public values: number[][];

  constructor() {
    this.values = [
      [0, 0, 0, 0],
      [0, 0, 0, 0],
      [0, 0, 0, 0],
      [0, 0, 0, 0],
    ];
    this.grid = new BehaviorSubject(this.values);
  }

  public setValue(x: number, y: number, value: number): void {
    this.values[x][y] = value;
    this.grid.next(this.values);
  }
}
