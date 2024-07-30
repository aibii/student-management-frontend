import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Teacher } from '../models/Teacher.model';

@Injectable({
  providedIn: 'root'
})
export class TeacherService {
  private baseUrl = 'http://localhost:8080/api/teachers';

  constructor(private http: HttpClient) { }

  addTeacher(teacher: Teacher): Observable<Teacher> {
    const headers = new HttpHeaders({'Content-Type': 'application/json'});
    return this.http.post<Teacher>(this.baseUrl, teacher, { headers });
  }

  getTeacher(id: number): Observable<Teacher> {
    return this.http.get<Teacher>(`${this.baseUrl}/${id}`);
  }

  getAllTeachers(): Observable<Teacher[]> {
    return this.http.get<Teacher[]>(this.baseUrl);
  }

  getTeacherById(id: number): Observable<Teacher> {
    return this.http.get<Teacher>(`${this.baseUrl}/${id}`);
  }

  updateTeacher(id: number, teacher: Teacher): Observable<Teacher> {
    return this.http.put<Teacher>(`${this.baseUrl}/${id}`, teacher);
  }

  deleteTeacher(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${id}`);
  }
}

