import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { TuiTime } from '@taiga-ui/cdk/date-time';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';

@Component({
  selector: 'app-principal',
  templateUrl: './principal.component.html',
  styleUrls: ['./principal.component.css'],
})
export class PrincipalComponent implements OnInit {
  numbers: number[] = [0, 1, 2, 3, 4, 5];
  dates: Date[] = [
    new Date(Date.now()),
    new Date(Date.now()),
    new Date(Date.now()),
    new Date(Date.now()),
    new Date(Date.now()),
    new Date(Date.now()),
  ];

  calculatedDates = {
    cristian: [
      new Date(Date.now()),
      new Date(Date.now()),
      new Date(Date.now()),
      new Date(Date.now()),
      new Date(Date.now()),
      new Date(Date.now()),
    ],
    berkeley: [
      new Date(Date.now()),
      new Date(Date.now()),
      new Date(Date.now()),
      new Date(Date.now()),
      new Date(Date.now()),
      new Date(Date.now()),
    ],
  };
  datesForm: FormControl[] = [
    new FormControl(
      new TuiTime(this.dates[0].getHours(), this.dates[0].getMinutes())
    ),
  ];
  isSelected: boolean = false;

  constructor() {}

  ngOnInit(): void {
    for (let i = 1; i < this.dates.length; i++) {
      this.datesForm.push(
        new FormControl(
          new TuiTime(this.dates[i].getHours(), this.dates[i].getMinutes())
        )
      );
    }
  }

  changeHour(n: number) {
    this.dates[n].setHours(this.datesForm[n].value?.hours);
    this.dates[n].setMinutes(this.datesForm[n].value?.minutes);
  }

  updateClocks(type: String) {
    let cDates = this.calculatedDates;
    if (type == 'c') {
      console.log('Cristian');
      this.dates = this.calculatedDates.cristian as Date[];
    }
    if (type == 'b') {
      console.log('Berkeley');
      this.dates = this.calculatedDates.berkeley as Date[];
    }
    for (let i = 0; i < this.dates.length; i++) {
      this.datesForm[i] = new FormControl(
        new TuiTime(this.dates[i].getHours(), this.dates[i].getMinutes())
      );
    }
    this.isSelected = false;
  }

  calculateClocks() {
    this.isSelected = true;
  }

  resetClocks() {
    for (let i = 0; i < this.dates.length; i++) {
      this.dates[i].setHours(0);
      this.dates[i].setMinutes(0);
      this.datesForm[i] = new FormControl(
        new TuiTime(this.dates[i].getHours(), this.dates[i].getMinutes())
      );
    }
    this.isSelected = false;
  }

  getFormat(d: Date) {
    return format(d, 'HH:mm', { locale: es });
  }
}
