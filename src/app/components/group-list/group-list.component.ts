import { Component, OnInit } from '@angular/core';
import { ClassGroup } from 'src/app/models/ClassGroup.model';
import { ClassGroupService } from 'src/app/services/group.service';
import { HttpClient } from '@angular/common/http'; // Import the HttpClient module
import { Router } from '@angular/router';

@Component({
  selector: 'app-group-list',
  templateUrl: './group-list.component.html',
  styleUrls: ['./group-list.component.css']
})

export class GroupListComponent implements OnInit {
  groups!: ClassGroup[];
  teacherName: string = '';
  courseName: string = '';

  constructor(private classGroupService: ClassGroupService, private router: Router) {}

  ngOnInit(): void {
    this.loadGroups();
  }

  viewGroup(id: number | undefined): void {
    if (id !== undefined) {
      this.router.navigate(['/groups/details', id]);
    } else {
      // Handle the case where id is undefined
      console.warn('Group ID is undefined.');
    }
  }

  loadGroups() {
    this.classGroupService.getGroupDetailsWithNames().subscribe(groups => {
      this.groups = groups;
    });
  }

  deleteGroup(id: number | undefined) {
    if (id !== undefined) {
      this.classGroupService.deleteGroup(id).subscribe(() => {
        this.loadGroups(); // Refresh the list after deletion
      });
    }
  }

  editGroup(group: ClassGroup) {
    this.router.navigate(['/groups/edit', group.id]); // Navigating to the edit form
  }}
