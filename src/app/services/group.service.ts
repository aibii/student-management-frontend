import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { GroupDto } from '../models/GroupDto.model';
import { ClassGroup } from '../models/ClassGroup.model';

@Injectable({
  providedIn: 'root'
})
export class ClassGroupService {
  private baseUrl = 'http://localhost:8080/api/groups';

  constructor(private http: HttpClient) {}

  getGroups(): Observable<ClassGroup[]> {
    return this.http.get<ClassGroup[]>(this.baseUrl);
  }

  getGroup(id: number): Observable<ClassGroup> {
    return this.http.get<ClassGroup>(`${this.baseUrl}/${id}`);
  }

  createGroup(group: ClassGroup): Observable<ClassGroup> {
    console.log('Sending group data:', group); // Add this line for debugging
    return this.http.post<ClassGroup>(this.baseUrl, group);
  }
  
  updateGroup(group: ClassGroup): Observable<ClassGroup> {
    return this.http.put<ClassGroup>(`${this.baseUrl}/${group.id}`, group);
  }

  deleteGroup(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }
}
