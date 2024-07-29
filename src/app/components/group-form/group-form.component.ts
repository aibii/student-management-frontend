import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Course } from 'src/app/models/Course.model';
import { Group } from 'src/app/models/Group.model';
import { GroupDto } from 'src/app/models/GroupDto.model';
import { Teacher } from 'src/app/models/Teacher.model';
import { CourseService } from 'src/app/services/course.service';
import { GroupService } from 'src/app/services/group.service';
import { HttpClient } from '@angular/common/http';
import { TeacherService } from 'src/app/services/teacher.service';

@Component({
  selector: 'app-group-form',
  templateUrl: './group-form.component.html',
  styleUrls: ['./group-form.component.css']
})

export class GroupFormComponent implements OnInit {

  groupForm!: FormGroup;
  isEdit = false;
  groupId!: number;

  newGroup = {
    groupName: '',
    description: '',
    startDate: '',
    endDate: '',
    teacher: { id: null },
    course: { id: null },
    monthlyFee: null
  };

  teachers: Teacher[] = []; // Specify the type as an array of Teacher
  courses: Course[] = [];  // Specify the type as an array of Course

  constructor(
    private groupService: GroupService,
    private route: ActivatedRoute,
    private router: Router,
    private teacherService: TeacherService, 
    private courseService: CourseService,
    private fb: FormBuilder,
    private http: HttpClient
  ) {}

  ngOnInit(): void {
    this.groupForm = this.fb.group({
      groupName: ['', Validators.required],
      teacher: ['', Validators.required],
      course: ['', Validators.required],
      description: '',
      startDate: ['', Validators.required],
      endDate: ['', Validators.required]
      // Remove course: ['', Validators.required]
    });


    // Load teachers and courses
    this.loadTeachers();
    this.loadCourses();

    // Edit mode
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

  onSubmit() {
    console.log("Submitting group:", this.newGroup);  // Debug: log the group data

    if (!this.newGroup.teacher.id || !this.newGroup.course.id) {
      console.error("Teacher ID and Course ID must be provided");
      return;
    }

    this.http.post('http://localhost:8080/api/groups', this.newGroup)
      .subscribe(response => {
        console.log('Group created successfully:', response);
      }, error => {
        console.error('Error creating group:', error);
      });
  }
}
