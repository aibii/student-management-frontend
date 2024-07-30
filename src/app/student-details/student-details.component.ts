import { Component, OnInit } from '@angular/core';
import { Student } from '../models/Student.model';
import { ActivatedRoute } from '@angular/router';
import { StudentService } from '../services/student.service';

@Component({
  selector: 'app-student-details',
  templateUrl: './student-details.component.html',
  styleUrls: ['./student-details.component.css']
})
export class StudentDetailsComponent implements OnInit {
  student!: Student;

  constructor(
    private route: ActivatedRoute,
    private studentService: StudentService
  ) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      if (id) {
        this.loadStudentDetails(+id);
      }
    });
  }

  loadStudentDetails(id: number): void {
    this.studentService.getStudent(id).subscribe(student => {
      this.student = student;
    });
  }
}
