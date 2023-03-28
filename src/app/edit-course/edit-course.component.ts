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
import { Router, ActivatedRoute } from '@angular/router';
import { DataService } from '../services/data.service';
import { Course } from '../shared/course';

@Component({
  selector: 'app-edit-course',
  templateUrl: './edit-course.component.html',
  styleUrls: ['./edit-course.component.scss'],
})
export class EditCourseComponent implements OnInit {
  course = {} as Course;
  courseForm: FormGroup = new FormGroup({
    name: new FormControl(''),
    duration: new FormControl(''),
    description: new FormControl(''),
  });
  Today: Date = new Date();
  courseID!: number;

  constructor(
    public fb: FormBuilder,
    private router: Router,
    private dataService: DataService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.courseID = +this.route.snapshot.params['id'];
    this.GetCourse(this.courseID);
    this.courseForm = this.fb.group({
      name: [
        '',
        [Validators.required, Validators.maxLength(7), Validators.minLength(6)],
      ],
      duration: ['', Validators.required],
      description: ['', Validators.required],
    });
  }

  GetCourse(id: number) {
    this.dataService.GetCourse(id).subscribe((result) => {
      this.course = result;
      console.log(result);
    });
  }

  async onSubmit(): Promise<void> {
    this.course.name = this.courseForm.get('name')?.value;
    this.course.duration = this.courseForm.get('duration')?.value;
    this.course.description = this.courseForm.get('description')?.value;

    await this.dataService
      .EditCourse(this.courseID, this.course)
      .subscribe(async (res) => {
        await console.log(res);
        this.router.navigate(['/courses']);
      });
  }
}
