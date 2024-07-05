import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StudentService {

  private baseUrl = 'http://localhost:8080/api/students';

  constructor(private http: HttpClient) { }

  getAllStudents(): Observable<any> {
    return this.http.get(`${this.baseUrl}`);
  }

  getStudentById(id: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/${id}`);
  }

  createStudent(student: Object): Observable<Object> {
    return this.http.post(`${this.baseUrl}`, student);
  }

  updateStudent(id: number, student: any): Observable<Object> {
    return this.http.put(`${this.baseUrl}/${id}`, student);
  }

  deleteStudent(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${id}`);
  }

  assignStudentToGroup(studentId: number, groupId: number): Observable<Object> {
    return this.http.post(`${this.baseUrl}/${studentId}/groups/${groupId}`, {});
  }
}

