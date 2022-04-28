import { BehaviorSubject, Observable } from "rxjs";
import { Course } from "./../model/course";
import { Injectable } from "@angular/core";
import { createHttpObservable } from "./util";
import { map, tap } from "rxjs/operators";

@Injectable({
  providedIn: "root",
})
export class Store {
  private subject = new BehaviorSubject<Course[]>([]);
  Courses$: Observable<Course[]> = this.subject.asObservable();

  init() {
    const http$ = createHttpObservable("/api/courses");
    http$
      .pipe(
        tap(() => console.log("HTTP request executed")),
        map((res) => Object.values(res["payload"]))
      )
      .subscribe((course) => this.subject.next(course));
  }

  selectBeginerCourses() {
    return this.filterByCategory("BEGINNER");
  }
  selectAdvancerCourses() {
    return this.filterByCategory("ADVANCED");
  }

  filterByCategory(category: string) {
    return this.Courses$.pipe(
      map((courses) => courses.filter((course) => course.category == category))
    );
  }
}
