import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ClassGroupService } from '../services/group.service';
import { TeacherService } from '../services/teacher.service';
import { CourseService } from '../services/course.service';
import { Course } from '../models/Course.model';
import { Teacher } from '../models/Teacher.model';
import { ClassGroup } from '../models/StudentGroup.model';

@Component({
  selector: 'app-group-details',
  templateUrl: './group-details.component.html',
  styleUrls: ['./group-details.component.css']
})
export class GroupDetailsComponent implements OnInit {
  group!: ClassGroup;
  teacherName: string = '';
  courseName: string = '';
  isEditMode: boolean = false; // Property to control edit mode

  constructor(
    private route: ActivatedRoute,
    private router: Router, // Add Router to navigate back
    private classGroupService: ClassGroupService,
    private teacherService: TeacherService,
    private courseService: CourseService
  ) {}

  ngOnInit(): void {
    const idParam = this.route.snapshot.paramMap.get('id');
    if (idParam) {
      const id = +idParam;
      console.log('Fetching group details for ID:', id);
      this.classGroupService.getGroupById(id).subscribe(group => {
        console.log('Group details fetched:', group);
        this.group = group;
        this.loadRelatedDetails();
      }, error => {
        console.error('Error fetching group details', error);
      });
    } else {
      console.error('No group ID provided');
    }
  }

  loadRelatedDetails(): void {
    if (this.group.teacherId) {
      console.log('Fetching teacher details for ID:', this.group.teacherId);
      this.teacherService.getTeacher(this.group.teacherId).subscribe(
        (teacher: Teacher) => {
          console.log('Teacher details fetched:', teacher);
          this.teacherName = teacher ? teacher.firstName : 'Unknown';
        },
        (error: any) => {
          console.error('Error fetching teacher details', error);
          this.teacherName = 'Unknown';
        }
      );
    } else {
      console.warn('No teacher ID found for this group');
    }
  
    if (this.group.courseId) {
      console.log('Fetching course details for ID:', this.group.courseId);
      this.courseService.getCourse(this.group.courseId).subscribe(
        (course: Course) => {
          console.log('Course details fetched:', course);
          if (course) {
            this.courseName = course.courseName;
          } else {
            console.warn('Course data is null or undefined');
            this.courseName = 'Unknown';
          }
        },
        (error: any) => {
          console.error('Error fetching course details', error);
          this.courseName = 'Unknown';
        }
      );
    } else {
      console.warn('No course ID found for this group');
    }
  }

  editGroup(): void {
    this.isEditMode = true; // Enable edit mode
  }

  goBackToList(): void {
    this.router.navigate(['/groups']); // Navigate back to the group list
  }
}
