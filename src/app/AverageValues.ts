import * as moment from 'moment';
export interface AverageValues {
  time: moment.Moment;
  value: number;
  day?: number;
}
