import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { StudentGroup } from '../models/StudentGroup.model';

@Injectable({
  providedIn: 'root'
})
export class StudentGroupService {
  private baseUrl = 'http://localhost:8080/api/student-groups';

  constructor(private http: HttpClient) {}

  getGroupsForStudent(studentId: number): Observable<StudentGroup[]> {
    return this.http.get<StudentGroup[]>(`${this.baseUrl}/student/${studentId}`);
  }

  assignStudentToGroup(studentGroup: StudentGroup): Observable<StudentGroup> {
    return this.http.post<StudentGroup>(this.baseUrl, studentGroup);
  }

  removeStudentFromGroup(studentGroupId: { studentId: number, groupId: number }): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${studentGroupId.studentId}/${studentGroupId.groupId}`);
  }

  getStudentGroups(studentId: number): Observable<StudentGroup[]> {
    return this.http.get<StudentGroup[]>(`${this.baseUrl}/student/${studentId}`);
    }
}