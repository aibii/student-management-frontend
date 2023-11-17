import { Component, OnInit } from '@angular/core';
import { TeacherService } from '../services/teacher.service';
import { Teacher } from '../models/Teacher.model';
import { Router } from '@angular/router';


@Component({
  selector: 'app-teacher',
  templateUrl: './teachers.component.html',
  styleUrls: ['./teachers.component.css']
})
export class TeacherComponent implements OnInit {
  teachers: Teacher[] = [];
  errorMessage: string = '';
  newTeacher: Teacher = {
    firstName: '',
    lastName: '',
    dateOfBirth: '',
    address: '',
    phoneNumber: ''
    // ... initialize other properties as needed ...
    ,
    id: 0
  };


  constructor(private teacherService: TeacherService, private router: Router) { }

  showAddTeacherForm = false;
  sortColumn: string = ''; // 'name' or 'dob'
  sortDirection: 'asc' | 'desc' = 'asc'; // or 'desc'



  ngOnInit(): void {
    this.fetchTeachers();
  }


  fetchTeachers(): void {
    this.teacherService.getAllTeachers().subscribe(
      data => {
        this.teachers = data;
      },
      error => {
        this.errorMessage = 'Error fetching teachers';
        console.error(error);
      }
    );
  }

  viewTeacherProfile(teacherName: number): void {
    // Assuming the route for a single teacher's profile is '/teacher/:id'
    this.router.navigate(['/teacher', teacherName]);
}

  toggleAddTeacherForm() {
    this.showAddTeacherForm = !this.showAddTeacherForm; // Toggle the form visibility.
  }

  addTeacher(): void {
    if (this.newTeacher.firstName && this.newTeacher.firstName.trim()) {
        this.teacherService.createTeacher(this.newTeacher).subscribe(
            (data: Teacher) => {
                console.log('Teacher added successfully!', data);
                this.teachers.push(data);
            },
            error => {
                console.error('Error adding teacher:', error);
            }
        );

        this.showAddTeacherForm = false;

        // Reset the newTeacher object for potential future use
        // Reset the newTeacher object for potential future use
      this.newTeacher = {
        firstName: '',
        lastName: '',
        dateOfBirth: '',
        address: '',
        phoneNumber: ''
        // ... add other required properties of Teacher here with default values ...
      };
    } else {
        console.warn('Teacher name is required.');
    }
}

// Adjust this function to correctly compare string and date values
compareValues(key: string, order = 'asc') {
  return function innerSort(a: { [x: string]: any; hasOwnProperty: (arg0: string) => any; }, b: { [x: string]: any; hasOwnProperty: (arg0: string) => any; }) {
    if (!a.hasOwnProperty(key) || !b.hasOwnProperty(key)) {
      // property doesn't exist on either object
      return 0;
    }

    const varA = (typeof a[key] === 'string') ? a[key].toUpperCase() : a[key];
    const varB = (typeof b[key] === 'string') ? b[key].toUpperCase() : b[key];

    let comparison = 0;
    if (varA > varB) {
      comparison = 1;
    } else if (varA < varB) {
      comparison = -1;
    }
    return (
      (order === 'desc') ? (comparison * -1) : comparison
    );
  };
}

sortData(column: string): void {
  this.sortColumn = column;
  this.sortDirection = (this.sortColumn === column && this.sortDirection === 'asc') ? 'desc' : 'asc';
  if (column === 'name') {
    this.teachers.sort(this.compareValues('firstName', this.sortDirection));
  } else {
    // For dateOfBirth, ensure correct date comparison
    this.teachers.sort(this.compareValues('dateOfBirth', this.sortDirection));
  }
}

}

