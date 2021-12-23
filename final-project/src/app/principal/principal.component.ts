import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { TuiTime } from '@taiga-ui/cdk/date-time';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';
import { ClocksService } from '../services/clocks.service';

@Component({
  selector: 'app-principal',
  templateUrl: './principal.component.html',
  styleUrls: ['./principal.component.css'],
})
export class PrincipalComponent implements OnInit {
  numbers: number[] = [0, 1, 2, 3, 4, 5];
  dates: Date[] = [];

  calculatedDates: { cristian: Date[]; berkeley: Date[] } = {
    cristian: [],
    berkeley: [], 
  };
  datesForm: FormControl[] = [];
  isSelected: boolean = false;

  constructor(private clocksService: ClocksService) {}

  ngOnInit(): void {
    this.dates = this.clocksService.getHours();
    for (let i = 0; i < this.dates.length; i++) {
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
    this.clocksService.setHour(n, this.dates[n]);
  }

  updateClocks(type: String) {
    if (type == 'c') {
      console.log('Cristian');
      this.dates = this.calculatedDates.cristian as Date[];
    }
    if (type == 'b') {
      console.log('Berkeley');
      this.dates = this.calculatedDates.berkeley as Date[];
    }
    this.clocksService.setHours(this.dates);
    for (let i = 0; i < this.dates.length; i++) {
      this.datesForm[i] = new FormControl(
        new TuiTime(this.dates[i].getHours(), this.dates[i].getMinutes())
      );
    }
    this.isSelected = false;
  }

  calculateClocks() {
    this.calculatedDates = this.clocksService.calculateAlgorithms();
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
    this.clocksService.setHours(this.dates);
    this.isSelected = false;
  }

  getFormat(d: Date) {
    return format(new Date(d), 'HH:mm', { locale: es });
  }
}
