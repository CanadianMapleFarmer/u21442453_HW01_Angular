import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable, Subject } from 'rxjs';
import { Course } from '../shared/course';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  apiUrl = 'http://localhost:5116/api/';

  httpOptions = {
    headers: new HttpHeaders({
      ContentType: 'application/json',
    }),
  };

  constructor(private httpClient: HttpClient) {}

  GetCourses(): Observable<any> {
    return this.httpClient
      .get(`${this.apiUrl}Course/GetAllCourses`)
      .pipe(map((result) => result));
  }

  GetCourse(id: number): Observable<any> {
    return this.httpClient
      .get(`${this.apiUrl}Course/GetCourse/${id}`)
      .pipe(map((result) => result));
  }

  AddCourse(course: Course): Observable<any> {
    return this.httpClient
      .post(`${this.apiUrl}Course/AddCourse`, {
        name: `${course.name}`,
        duration: `${course.duration}`,
        description: `${course.description}`,
      })
      .pipe(map((result) => result));
  }

  DeleteCourse(id: number): Observable<any> {
    return this.httpClient
      .delete(`${this.apiUrl}Course/DeleteCourse/${id}`)
      .pipe(map((result) => result));
  }

  EditCourse(id: number, course: Course): Observable<any> {
    return this.httpClient.put(`${this.apiUrl}Course/EditCourse/${id}`, {
      name: `${course.name}`,
      duration: `${course.duration}`,
      description: `${course.description}`,
    });
  }
}
