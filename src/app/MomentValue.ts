import * as moment from 'moment';

export class MomentValue {
  constructor(time: moment.Moment, value: number) {
    this.time = time;
    this.value = value;
      }

  time: moment.Moment;
  value: number;
  }
