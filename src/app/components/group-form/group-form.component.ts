import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Course } from 'src/app/models/Course.model';
import { Group } from 'src/app/models/Group.model';
import { GroupDto } from 'src/app/models/GroupDto.model';
import { Teacher } from 'src/app/models/Teacher.model';
import { CourseService } from 'src/app/services/course.service';
import { GroupService } from 'src/app/services/group.service';
import { TeacherService } from 'src/app/services/teacher.service';

@Component({
  selector: 'app-group-form',
  templateUrl: './group-form.component.html',
  styleUrls: ['./group-form.component.css']
})

export class GroupFormComponent implements OnInit {
  teachers: Teacher[] = []; // Use your Teacher type
  courses: Course[] = []; // Use your Course type

  groupForm!: FormGroup;
  isEdit = false;
  groupId!: number;

  constructor(
    private groupService: GroupService,
    private route: ActivatedRoute,
    private router: Router,
    private teacherService: TeacherService, 
    private courseService: CourseService,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.groupForm = this.fb.group({
      groupName: ['', Validators.required],
      teacherId: ['', Validators.required],
      description: '',
      courseId: ['', Validators.required],
      startDate: ['', Validators.required],
      endDate: ['', Validators.required]
    });

    this.loadTeachers();
    this.loadCourses();

    this.route.params.subscribe(params => {
      if (params['id']) {
        this.isEdit = true;
        this.groupId = +params['id'];
        this.groupService.getGroupById(this.groupId).subscribe(data => {
          // Transform the data to match the form structure if necessary
          this.groupForm.patchValue(data);
        });
      }
    });
  }

  loadTeachers() {
    this.teacherService.getAllTeachers().subscribe(
      (data) => {
        this.teachers = data;
      },
      (error) => {
        console.error('Error loading teachers', error);
      }
    );
  }

  loadCourses() {
    this.courseService.getAllCourses().subscribe(
      (data) => {
        this.courses = data;
      },
      (error) => {
        console.error('Error loading courses', error);
      }
    );
  }

  onSubmit(): void {
    if (this.groupForm.valid) {
      const formValue = this.groupForm.value;
  
      // Construct the Group object
      const group: Group = {
        groupName: formValue.groupName,
        description: formValue.description,
        startDate: formValue.startDate,
        endDate: formValue.endDate,
        teacherId: formValue.teacherId,
        courseId: formValue.courseId
      };
  
      if (this.isEdit) {
        this.groupService.updateGroup(this.groupId, group).subscribe(() => {
          this.router.navigate(['/groups']);
        });
      } else {
        this.groupService.createGroup(group).subscribe(() => {
          this.router.navigate(['/groups']);
        });
      }
    }
  }
  
  
}
