import { Component, OnInit } from '@angular/core';
import { Group } from 'src/app/models/Group.model';
import { GroupService } from 'src/app/services/group.service';

@Component({
  selector: 'app-group-list',
  templateUrl: './group-list.component.html',
  styleUrls: ['./group-list.component.css']
})
export class GroupListComponent implements OnInit {
  groups: Group[] = [];

  constructor(private groupService: GroupService) {}

  ngOnInit(): void {
    this.groupService.getAllGroups().subscribe(data => {
      this.groups = data;
    });
  }

  deleteGroup(id: number): void {
    this.groupService.deleteGroup(id).subscribe(() => {
      this.groups = this.groups.filter(group => group.id !== id);
    });
  }
}
