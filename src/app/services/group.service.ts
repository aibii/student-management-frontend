import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Group } from '../models/Group.model';
import { GroupDto } from '../models/GroupDto.model';

@Injectable({
  providedIn: 'root'
})
export class GroupService {
  private baseUrl = 'http://localhost:8080/api/groups';  // Your API endpoint

  constructor(private http: HttpClient) {}

  getAllGroups(): Observable<Group[]> {
    return this.http.get<Group[]>(`${this.baseUrl}`);
  }

  getGroupById(id: number): Observable<Group> {
    return this.http.get<Group>(`${this.baseUrl}/${id}`);
  }

  createGroup(group: Group): Observable<Group> {
    // Your existing code to make the HTTP POST request
    // Ensure the URL and HTTP method are correct
    return this.http.post<Group>(`[Your API Endpoint]`, group);
  }

  updateGroup(id: number, group: Group): Observable<Group> {
    return this.http.put<Group>(`${this.baseUrl}/${id}`, group);
  }

  deleteGroup(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${id}`);
  }
}
