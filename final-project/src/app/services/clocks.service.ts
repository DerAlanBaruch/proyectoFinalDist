import { Injectable } from '@angular/core';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';

@Injectable({
  providedIn: 'root',
})
export class ClocksService {
  constructor() {}

  hours: Date[] = [
    new Date(Date.now()),
    new Date(Date.now()),
    new Date(Date.now()),
    new Date(Date.now()),
    new Date(Date.now()),
    new Date(Date.now()),
  ];

  calculatedHours: { cristian: Date[]; berkeley: Date[] } = {
    cristian: [],
    berkeley: [],
  };

  getHours() {
    return this.hours;
  }

  calculateAlgorithms(): any {
    this.calculatedHours = {
      cristian: [],
      berkeley: [],
    };
    //Cristian
    let coordinator = new Date(this.hours[0]);
    this.calculatedHours.cristian.push(new Date(coordinator));
    let coordinatorMinutes =
      coordinator.getHours() * 60 + coordinator.getMinutes();
    for (let i = 1; i < this.hours.length; i++) {
      let h = new Date(this.hours[i]);
      let minutes = h.getHours() * 60 + h.getMinutes();
      if (
        (coordinatorMinutes - 60) % (24 * 60) <= minutes &&
        (coordinatorMinutes + 60) % (24 * 60) >= minutes
      )
        this.calculatedHours.cristian.push(new Date(coordinator));
      else this.calculatedHours.cristian.push(new Date(h));
      console.log(this.getFormat(this.calculatedHours.cristian[i]));
    }
    //Berkeley
    var sum = 0;
    let n = 0;
    for (let i = 0; i < this.hours.length; i++) {
      let h1 = new Date(this.hours[i]);
      let minutes = h1.getHours() * 60 + h1.getMinutes();
      if (
        ((coordinatorMinutes - 60) % (24 * 60) <= minutes &&
          (coordinatorMinutes + 60) % (24 * 60) >= minutes) ||
        coordinatorMinutes == minutes
      ) {
        sum = sum + minutes;
        n = n + 1;
        console.log(n, sum);
      }
    }
    console.log(n);
    sum = Math.round(sum / n);
    console.log(sum);
    let hour = Math.floor(sum / 60);
    let minut = sum - hour * 60;
    for (let i = 0; i < this.hours.length; i++) {
      let h = new Date(this.hours[i]);
      let minutes = h.getHours() * 60 + h.getMinutes();
      if (
        ((coordinatorMinutes - 60) % (24 * 60) <= minutes &&
          (coordinatorMinutes + 60) % (24 * 60) >= minutes) ||
        coordinatorMinutes == minutes
      ) {
        this.calculatedHours.berkeley.push(
          new Date(0, 0, 0, hour, minut, 0, 0)
        );
      } else {
        this.calculatedHours.berkeley.push(new Date(h));
      }

      console.log(this.getFormat(this.calculatedHours.berkeley[i]));
    }
    return this.calculatedHours;
  }

  setHour(id: number, hour: Date) {
    this.hours[id] = new Date(hour);
  }

  setHours(hs: Date[]) {
    for (let i = 0; i < this.hours.length; i++) {
      this.hours[i] = new Date(hs[i]);
    }
  }

  getFormat(d: Date) {
    return format(new Date(d), 'HH:mm', { locale: es });
  }
}
