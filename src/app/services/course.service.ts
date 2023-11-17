import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Course } from '../models/Course.model';

@Injectable({
  providedIn: 'root'
})
export class CourseService {

  private baseUrl = 'http://localhost:8080/api/courses';

  constructor(private http: HttpClient) { }

  getAllCourses(): Observable<any> {
    return this.http.get(`${this.baseUrl}`);
  }

  getCourseById(id: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/${id}`);
  }

  createCourse(course: Object): Observable<Object> {
    return this.http.post(`${this.baseUrl}`, course);
  }

  updateCourse(courseId: number, courseData: Course): Observable<Course> {
    // Use the baseUrl and append the courseId to it
    return this.http.put<Course>(`${this.baseUrl}/${courseId}`, courseData);
}
  
  deleteCourse(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${id}`);
  }

  addCourse(courseData: any): Observable<Course> {
    return this.http.post<Course>(this.baseUrl, courseData);
  }
}
