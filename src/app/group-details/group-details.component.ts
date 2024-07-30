import { Component, OnInit } from '@angular/core';
import { ClassGroup } from '../models/ClassGroup.model';
import { ActivatedRoute, Router } from '@angular/router';
import { ClassGroupService } from '../services/group.service';

@Component({
  selector: 'app-group-details',
  templateUrl: './group-details.component.html',
  styleUrls: ['./group-details.component.css']
})

export class GroupDetailsComponent implements OnInit {
  group!: ClassGroup;
  isEditMode: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private classGroupService: ClassGroupService
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const id = +params.get('id')!;
      this.loadGroupData(id);
    });

    // Determine if the route is for viewing or editing
    this.isEditMode = this.router.url.includes('edit');
  }

  loadGroupData(id: number): void {
    this.classGroupService.getGroup(id).subscribe(group => {
      this.group = group;
    });
  }

  editGroup(): void {
    this.router.navigate(['/groups/edit', this.group.id]);
  }

  goBackToList(): void {
    this.router.navigate(['/groups']);
  }
}
