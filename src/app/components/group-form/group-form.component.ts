import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Course } from 'src/app/models/Course.model';
import { Teacher } from 'src/app/models/Teacher.model';
import { CourseService } from 'src/app/services/course.service';
import { ClassGroupService } from 'src/app/services/group.service';
import { HttpClient } from '@angular/common/http';
import { TeacherService } from 'src/app/services/teacher.service';
import { ClassGroup } from 'src/app/models/StudentGroup.model';

@Component({
  selector: 'app-group-form',
  templateUrl: './group-form.component.html',
  styleUrls: ['./group-form.component.css']
})

export class GroupFormComponent implements OnInit {
  groupForm!: FormGroup;
  teachers: Teacher[] = [];
  courses: Course[] = [];
  isEditMode: boolean = false;
  groupId!: number;

  constructor(
    private formBuilder: FormBuilder,
    private classGroupService: ClassGroupService,
    private route: ActivatedRoute,
    private router: Router,
    private teacherService: TeacherService,
    private courseService: CourseService
  ) {}

  ngOnInit(): void {
    this.groupForm = this.formBuilder.group({
      groupName: ['', Validators.required],
      teacherId: ['', [Validators.required, Validators.pattern('^[0-9]+$')]], // Ensure this is a number
      courseId: ['', [Validators.required, Validators.pattern('^[0-9]+$')]], // Ensure this is a number
      description: [''],
      schedule: ['', Validators.required], // Added schedule field
      startDate: ['', Validators.required],
      endDate: ['', Validators.required],
      monthlyFee: ['', [Validators.required, Validators.pattern('^[0-9]+(\\.[0-9]{1,2})?$')]], // Ensure this is a number
      lessonTime: ['', Validators.required]
    });

    this.loadTeachersAndCourses();

    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      if (id) {
        this.isEditMode = true;
        this.groupId = +id;
        this.loadGroupData(this.groupId);
      } else {
        this.isEditMode = false;
      }
    });
  }

  loadGroupData(id: number): void {
    this.classGroupService.getGroup(id).subscribe(
      (group: ClassGroup) => {
        if (group) {
          this.groupForm.patchValue(group);
        }
      },
      (error) => {
        console.error('Error loading group data:', error);
      }
    );
  }

  loadTeachersAndCourses(): void {
    this.teacherService.getAllTeachers().subscribe(
      (teachers: Teacher[]) => {
        this.teachers = teachers;
        if (!teachers.length) {
          console.warn('No teachers found.');
        }
      },
      (error) => {
        console.error('Error loading teachers:', error);
      }
    );

    this.courseService.getAllCourses().subscribe(
      (courses: Course[]) => {
        this.courses = courses;
        if (!courses.length) {
          console.warn('No courses found.');
        }
      },
      (error) => {
        console.error('Error loading courses:', error);
      }
    );
  }

  onSubmit(): void {
    if (this.groupForm.invalid) {
      console.warn('Form is invalid');
      return;
    }

    const group: ClassGroup = this.groupForm.value;

    if (this.isEditMode) {
      group.id = this.groupId;
      this.classGroupService.updateGroup(group).subscribe(() => {
        this.router.navigate(['/groups']);
      }, (error) => {
        console.error('Update error:', error);
      });
    } else {
      this.classGroupService.createGroup(group).subscribe(() => {
        this.router.navigate(['/groups']);
      }, (error) => {
        console.error('Creation error:', error);
      });
    }
  }

  onCancel(): void {
    this.router.navigate(['/groups']);
  }
}
