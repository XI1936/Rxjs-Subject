import { BehaviorSubject, Observable } from "rxjs";
import { Course } from "./../model/course";
import { Injectable } from "@angular/core";
import { createHttpObservable } from "./util";
import { map, tap } from "rxjs/operators";
import { fromPromise } from "rxjs/internal-compatibility";

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

  selectedStore(id: number) {
    return this.Courses$.pipe(
      map((courses) => courses.find((course) => course.id == id))
    );
  }
  filterByCategory(category: string) {
    return this.Courses$.pipe(
      map((courses) => courses.filter((course) => course.category == category))
    );
  }

  saveCourse(CourseId: number, changes): Observable<any> {
    const courses = this.subject.getValue();
    const courseIndex = courses.findIndex((course) => course.id == CourseId);
    const newCourses = courses.splice(0);
    newCourses[courseIndex] = {
      ...courses[courseIndex],
      ...changes,
    };
    this.subject.next(newCourses);

    return fromPromise(
      fetch(`api/courses/${CourseId}`, {
        method: "PUT",
        body: JSON.stringify(changes),
        headers: {
          "content-type": "application/json",
        },
      })
    );
  }
}
