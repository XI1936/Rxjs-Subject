import { Component, OnInit, ViewEncapsulation } from "@angular/core";
import {
  concat,
  fromEvent,
  interval,
  noop,
  observable,
  Observable,
  of,
  timer,
  merge,
  Subject,
  BehaviorSubject,
  AsyncSubject,
  ReplaySubject,
} from "rxjs";
import { delayWhen, filter, map, take, timeout } from "rxjs/operators";
import { createHttpObservable } from "../common/util";

@Component({
  selector: "about",
  templateUrl: "./about.component.html",
  styleUrls: ["./about.component.css"],
})
export class AboutComponent implements OnInit {
  ngOnInit() {
    //Plan Subject which supports early Subscription
    // const subject = new Subject();
    // const series1$ = subject.asObservable();
    // subject.next(1);
    // subject.next(2);
    // series1$.subscribe((val) => console.log(val));
    // subject.next("After subscribe " + 3);
    //-------------Behaviour Suject-------------------
    // const subject = new BehaviorSubject(0);
    // const series1$ = subject.asObservable();
    // series1$.subscribe((val) => console.log("Early subscription", val));
    // subject.next(1);
    // subject.next(2);
    // // subject.complete();
    // setTimeout(() => {
    //   series1$.subscribe((val) => console.log("Late subscription", val));
    //   subject.next(3);
    // }, 2000);
    //-------------Async Suject-------------------
    // const subject = new AsyncSubject();
    // const series1$ = subject.asObservable();
    // series1$.subscribe((val) => console.log("Early subscription", val));
    // subject.next(1);
    // subject.next(2);
    // // subject.complete();
    //-------------ReplaySuject-------------------
    // const subject = new ReplaySubject();
    // const series1$ = subject.asObservable();
    // series1$.subscribe((val) => console.log("Early subscription", val));
    // subject.next(1);
    // subject.next(2);
    //  //subject.complete();
    // setTimeout(() => {
    //   series1$.subscribe((val) => console.log("Late subscription", val));
    //   //subject.next(3);
    // }, 2000);
  }
}
