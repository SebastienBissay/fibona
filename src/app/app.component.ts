import { Component } from '@angular/core';
import { ValuesService } from './core/services/values.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  private fibonacciSuite: number[];
  public score: number;

  constructor(private valuesService: ValuesService) {
    this.addNewNumber();
    this.fibonacciSuite = [1, 1];
    this.score = 0;
  }

  public up(): void {
    let hasMoved: boolean = false;
    for (let y: number = 1; y < 4; y++) {
      for (let x: number = 0; x < 4; x++) {
        let value: number = this.valuesService.values[x][y];
        if (value > 0) {
          let vY: number = y;
          while (vY > 0 && this.valuesService.values[x][vY - 1] == 0) {
            vY--;
          }
          if (vY != y) {
            hasMoved = true;
            this.valuesService.setValue(x, y, 0);
            this.valuesService.setValue(x, vY, value);
          }
          if (vY > 0) {
            let oValue: number = this.valuesService.values[x][vY - 1];
            if (this.areFiboNeighbours(value, oValue)) {
              hasMoved = true;
              this.valuesService.setValue(x, vY - 1, value + oValue);
              this.valuesService.setValue(x, vY, 0);
              this.score += value + oValue;
            }
          }
        }
      }
    }
    if (hasMoved) {
      this.addNewNumber();
    }
  }

  public down(): void {
    let hasMoved: boolean = false;
    for (let y: number = 2; y >= 0; y--) {
      for (let x: number = 0; x < 4; x++) {
        let value: number = this.valuesService.values[x][y];
        if (value > 0) {
          let vY: number = y;
          while (vY < 3 && this.valuesService.values[x][vY + 1] == 0) {
            vY++;
          }
          if (vY != y) {
            hasMoved = true;
            this.valuesService.setValue(x, y, 0);
            this.valuesService.setValue(x, vY, value);
          }
          if (vY < 3) {
            let oValue: number = this.valuesService.values[x][vY + 1];
            if (this.areFiboNeighbours(value, oValue)) {
              hasMoved = true;
              this.valuesService.setValue(x, vY + 1, value + oValue);
              this.valuesService.setValue(x, vY, 0);
              this.score += value + oValue;
            }
          }
        }
      }
    }
    if (hasMoved) {
      this.addNewNumber();
    }
  }

  public left(): void {
    let hasMoved: boolean = false;
    for (let x: number = 1; x < 4; x++) {
      for (let y: number = 0; y < 4; y++) {
        let value: number = this.valuesService.values[x][y];
        if (value > 0) {
          let vX: number = x;
          while (vX > 0 && this.valuesService.values[vX - 1][y] == 0) {
            vX--;
          }
          if (vX != x) {
            hasMoved = true;
            this.valuesService.setValue(x, y, 0);
            this.valuesService.setValue(vX, y, value);
          }
          if (vX > 0) {
            let oValue: number = this.valuesService.values[vX - 1][y];
            if (this.areFiboNeighbours(value, oValue)) {
              hasMoved = true;
              this.valuesService.setValue(vX - 1, y, value + oValue);
              this.valuesService.setValue(vX, y, 0);
              this.score += value + oValue;
            }
          }
        }
      }
    }
    if (hasMoved) {
      this.addNewNumber();
    }
  }

  public right(): void {
    let hasMoved: boolean = false;
    for (let x: number = 2; x >= 0; x--) {
      for (let y: number = 0; y < 4; y++) {
        let value: number = this.valuesService.values[x][y];
        if (value > 0) {
          let vX: number = x;
          while (vX < 3 && this.valuesService.values[vX + 1][y] == 0) {
            vX++;
          }
          if (vX != x) {
            hasMoved = true;
            this.valuesService.setValue(x, y, 0);
            this.valuesService.setValue(vX, y, value);
          }
          if (vX < 3) {
            let oValue: number = this.valuesService.values[vX + 1][y];
            if (this.areFiboNeighbours(value, oValue)) {
              hasMoved = true;
              this.valuesService.setValue(vX + 1, y, value + oValue);
              this.valuesService.setValue(vX, y, 0);
              this.score += value + oValue;
            }
          }
        }
      }
    }
    if (hasMoved) {
      this.addNewNumber();
    }
  }

  private areFiboNeighbours(n: number, m: number): boolean {
    if (n < m) {
      return this.areFiboNeighbours(m, n);
    }
    while (this.fibonacciSuite[this.fibonacciSuite.length - 1] < n) {
      this.fibonacciSuite.push(
        this.fibonacciSuite[this.fibonacciSuite.length - 2] +
          this.fibonacciSuite[this.fibonacciSuite.length - 1]
      );
    }
    return m == this.fibonacciSuite[this.fibonacciSuite.lastIndexOf(n) - 1];
  }

  private addNewNumber() {
    let possibilities: number[][] = [];
    for (let x: number = 0; x < 4; x++) {
      for (let y: number = 0; y < 4; y++) {
        if (this.valuesService.values[x][y] == 0) {
          possibilities.push([x, y]);
        }
      }
    }
    let index: number = Math.floor(Math.random() * possibilities.length);
    this.valuesService.setValue(
      possibilities[index][0],
      possibilities[index][1],
      Math.random() > 0.33 ? 1 : 2
    );
  }
}
