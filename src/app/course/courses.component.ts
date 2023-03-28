import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from '../services/data.service';
import { Course } from '../shared/course';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.scss'],
})
export class CoursesComponent implements OnInit {
  courses: Course[] = [];
  Today: Date = new Date();

  constructor(private dataService: DataService, private router: Router) {}

  ngOnInit(): void {
    this.courses = [];
    this.GetCourses();
    console.log(this.courses);
  }

  GetCourses() {
    this.dataService.GetCourses().subscribe((result) => {
      let courseList: any[] = result;
      courseList.forEach((element) => {
        this.courses.push(element);
      });
    });
  }

  async DeleteCourse(course: Course) {
    await this.dataService
      .DeleteCourse(course.courseId)
      .subscribe(async (result) => {
        this.courses = [];
        this.GetCourses();
        await console.log(result);
      });
  }
}
