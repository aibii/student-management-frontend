import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TeacherService } from '../services/teacher.service';
import { Teacher } from '../models/Teacher.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-teacher-profile',
  templateUrl: './teacher-profile.component.html',
  styleUrls: ['./teacher-profile.component.css']
})
export class TeacherProfileComponent implements OnInit {

  teacher: Teacher | null = null;
  errorMessage: string = '';
  successMessage: string | undefined;

  constructor(private route: ActivatedRoute, private teacherService: TeacherService,
              private router: Router) {}

  ngOnInit(): void {
    const id = +this.route.snapshot.paramMap.get('id')!;
    this.teacherService.getTeacherById(id).subscribe(
      teacher => this.teacher = teacher,
      error => this.errorMessage = "Error fetching teacher."
    );
  }

  saveTeacher() {
    if (this.teacher?.id) {
        this.teacherService.updateTeacher(this.teacher.id, this.teacher).subscribe(
            () => {
                this.successMessage = "Teacher updated successfully!";
                // Navigate or handle successful update as needed
            },
            error => {
                this.errorMessage = "Error updating teacher.";
            }
        );
    }
  }

  deleteTeacher() {
    if (this.teacher?.id) {
      // Confirm deletion
      if (confirm('Are you sure you want to delete this teacher?')) {
        this.teacherService.deleteTeacher(this.teacher.id).subscribe(
          () => {
            this.successMessage = 'Teacher deleted successfully.';
            // Navigate to teachers list with a delay so user can read message
            setTimeout(() => this.router.navigate(['/teachers']), 1500);
          },
          error => {
            this.errorMessage = "Error deleting teacher.";
            // Log the error or handle it appropriately
            console.error('Error:', error);
          }
        );
      }
    } else {
      this.errorMessage = "Teacher ID not found.";
    }
  }
}
