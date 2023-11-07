import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Teacher } from '../models/Teacher.model';

@Injectable({
  providedIn: 'root'
})
export class TeacherService {

  private baseUrl = 'http://localhost:8080/api/teachers';

  constructor(private http: HttpClient) { }

  getAllTeachers(): Observable<any> {
    return this.http.get(`${this.baseUrl}`);
  }

  getTeacherById(id: number): Observable<Teacher> {
    return this.http.get<Teacher>(`${this.baseUrl}/${id}`);
}

  createTeacher(teacher: Teacher): Observable<Teacher> {
    return this.http.post<Teacher>(`${this.baseUrl}`, teacher);
}

  updateTeacher(id: number, teacher: Teacher): Observable<Teacher> {
    //const url = `${this.baseUrl}/teachers/${id}`;
    return this.http.put<Teacher>((`${this.baseUrl}/${id}`), teacher);
  }

  deleteTeacher(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${id}`);
  }

}

