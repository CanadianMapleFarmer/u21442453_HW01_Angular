import { Component, OnInit } from '@angular/core';
import {
  Form,
  FormBuilder,
  FormGroup,
  NgModel,
  AbstractControl,
  Validators,
  FormControl,
} from '@angular/forms';
import { Router } from '@angular/router';
import { DataService } from '../services/data.service';
import { Course } from '../shared/course';

@Component({
  selector: 'app-add-course',
  templateUrl: './add-course.component.html',
  styleUrls: ['./add-course.component.scss'],
})
export class AddCourseComponent implements OnInit {
  course = {} as Course;
  courseForm: FormGroup = new FormGroup({
    name: new FormControl(''),
    duration: new FormControl(''),
    description: new FormControl(''),
  });
  Today: Date = new Date();

  constructor(
    public fb: FormBuilder,
    private router: Router,
    private dataService: DataService
  ) {}

  ngOnInit(): void {
    this.courseForm = this.fb.group({
      name: [
        '',
        [
          Validators.required, 
          Validators.maxLength(7), 
          Validators.minLength(7)],
      ],
      duration: ['', Validators.required],
      description: ['', Validators.required],
    });
  }

  async onSubmit(): Promise<void> {
    this.course.name = this.courseForm.get('name')?.value;
    this.course.duration = this.courseForm.get('duration')?.value;
    this.course.description = this.courseForm.get('description')?.value;

    await this.dataService.AddCourse(this.course).subscribe(async (res) => {
      await console.log(res);
      this.router.navigate(['/courses']);
    });
  }
}
