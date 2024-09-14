import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GroupStudentService {
  private apiUrl = 'http://localhost:8080/api/groups/with-students';  // Change this to your actual API URL

  constructor(private http: HttpClient) {}

  getGroupsWithStudents(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }
}