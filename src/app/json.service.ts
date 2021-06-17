import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {JsonData} from './JsonData';

@Injectable()
export class JsonService {
  constructor(private http: HttpClient) {}


  getData(): Observable<JsonData[]> {
    return this.http.get<JsonData[]>('assets/test.json');
  }

  // pushData(timestamp: number, value: number) {
  // alert(moment.utc(timestamp).format("MM DD YYYY hh:mm"));
  // }
}
