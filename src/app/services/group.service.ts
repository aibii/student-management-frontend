import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, forkJoin, map, switchMap } from 'rxjs';
import { Teacher } from '../models/Teacher.model';
import { Course } from '../models/Course.model';
import { ClassGroup } from '../models/StudentGroup.model';

@Injectable({
  providedIn: 'root'
})
export class ClassGroupService {
  private baseUrl = 'http://localhost:8080/api/groups';

  constructor(private http: HttpClient) {}

  getGroups(): Observable<ClassGroup[]> {
    return this.http.get<ClassGroup[]>(this.baseUrl);
  }

  getGroupDetailsWithNames(): Observable<ClassGroup[]> {
    return this.getGroups().pipe(
      switchMap(groups => {
        const teacherIds = [...new Set(groups.map(g => g.teacherId).filter(id => id !== undefined))];
        const courseIds = [...new Set(groups.map(g => g.courseId).filter(id => id !== undefined))];

        return forkJoin({
          teachers: this.http.get<Teacher[]>(`http://localhost:8080/api/teachers?ids=${teacherIds.join(',')}`),
          courses: this.http.get<Course[]>(`http://localhost:8080/api/courses?ids=${courseIds.join(',')}`)
        }).pipe(
          map(results => {
            const teacherMap = new Map<number, string>();
            const courseMap = new Map<number, string>();

            results.teachers.forEach(teacher => {
              console.log('Teacher fetched:', teacher); // Debugging output
              teacherMap.set(teacher.id, teacher.firstName);
            });

            results.courses.forEach(course => {
              console.log('Course fetched:', course); // Debugging output
              courseMap.set(course.id, course.courseName);
            });

            return groups.map(group => ({
              ...group,
              teacherName: group.teacherId ? teacherMap.get(group.teacherId) || 'Unknown' : 'Unknown',
              courseName: group.courseId ? courseMap.get(group.courseId) || 'Unknown' : 'Unknown'
            }));
          })
        );
      })
    );
  }

  getGroup(id: number): Observable<ClassGroup> {
    return this.http.get<ClassGroup>(`${this.baseUrl}/${id}`);
  }

  getGroupById(id: number): Observable<ClassGroup> {
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
