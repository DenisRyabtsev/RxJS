import { Component, OnInit,  } from '@angular/core';
import {Observable, Subscription} from 'rxjs';


@Component({
  selector: 'app-rxjs',
  templateUrl: './rxjs.component.html',
  styleUrls: ['./rxjs.component.css']
})
export class RxjsComponent implements OnInit {
  sub: Subscription;
  sub2: Subscription;

  constructor() { }
  stream$ = new Observable<any>((v) => {
    v.next("first"),
      setTimeout(() => v.next("second"), 4000),
      setTimeout(() => v.complete(), 5000),
     setTimeout(() => v.error("передана ошибка"),6000)
  });

  stop() {
    this.sub.unsubscribe(),
      this.sub2.unsubscribe()


  }

  ngOnInit() {
    // this.sub = this.stream$.subscribe((a) =>  console.log(a),
    //   (err) => console.log("error",err),
    //   ()=>console.log("стрим завершен")),
    //   this.sub2 = this.stream$.subscribe((a) =>  console.log(a),
    //     (err) => console.log("error",err),
    //     ()=>console.log("стрим завершен"))
  }


}
