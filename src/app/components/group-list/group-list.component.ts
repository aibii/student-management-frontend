import { Component, OnInit } from '@angular/core';
import { Group } from 'src/app/models/Group.model';
import { GroupService } from 'src/app/services/group.service';
import { HttpClient } from '@angular/common/http'; // Import the HttpClient module

@Component({
  selector: 'app-group-list',
  templateUrl: './group-list.component.html',
  styleUrls: ['./group-list.component.css']
})
export class GroupListComponent implements OnInit {
  groups: Group[] = [];
  baseUrl: string = 'http://localhost:8080/api/groups'; // Declare the 'baseUrl' property

  constructor(private groupService: GroupService, private http: HttpClient) {} // Inject the HttpClient module

  ngOnInit(): void {
    this.groupService.getAllGroups().subscribe(data => {
      this.groups = data;
    });
  }

  deleteGroup(id: number): void {
    this.http.delete(`${this.baseUrl}/${id}`).subscribe(
      () => {
        this.groups = this.groups.filter(group => group.id !== id);
      },
      (error) => {
        console.error('Error deleting group:', error);
        // Handle error (e.g., show a notification to the user)
      }
    );
  }
}
