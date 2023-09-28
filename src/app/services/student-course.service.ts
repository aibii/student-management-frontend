import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StudentCourseService {

  private baseUrl = 'http://localhost:8080/api/student_courses';

  constructor(private http: HttpClient) { }

  getAllStudentCourses(): Observable<any> {
    return this.http.get(`${this.baseUrl}`);
  }

  getStudentCourseById(id: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/${id}`);
  }

  createStudentCourse(studentCourse: Object): Observable<Object> {
    return this.http.post(`${this.baseUrl}`, studentCourse);
  }

  updateStudentCourse(id: number, studentCourse: any): Observable<Object> {
    return this.http.put(`${this.baseUrl}/${id}`, studentCourse);
  }

  deleteStudentCourse(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${id}`);
  }
}



