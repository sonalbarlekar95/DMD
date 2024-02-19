import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { ConfirmationService } from 'primeng/api';
import { DataService } from 'src/app/service/data.service';

@Component({
  selector: 'app-item-list',
  templateUrl: './item-list.component.html',
  styleUrls: ['./item-list.component.scss']
})
export class ItemListComponent implements OnInit {

  todos: any = [];
  users: any = [];
  @Output() onSelectItem = new EventEmitter();

  sortOrder: any;

  sortField: any;
  sortOptions: any[] = [];
  sortKey: any;

  constructor(private dataService: DataService, private confirmationService: ConfirmationService, 
    public router: Router) { }

  ngOnInit() {
    this.getUsers();
  }

  getUsers (){
    this.dataService.getUsers().subscribe((data: any) => {
      this.users = data;
      this.onSelectItem.emit(this.users[0])
      console.log("this.users", this.users)
    });
  }

  confirm(id: any) {
    this.confirmationService.confirm({
        message: 'Are you sure that you want to perform this action?',
        accept: () => {
            this.deleteUser(id);
        }
    });
  }

  deleteUser(id: any) {
    this.dataService.deleteUser(id).subscribe((resp: any) => {
      if(resp.success) {
        console.log("response of delete ", resp);
      }
    })
  }

  onSortChange(event: any) {
    let value = event.value;

    if (value.indexOf('!') === 0) {
      this.sortOrder = -1;
      this.sortField = value.substring(1, value.length);
    }
    else {
      this.sortOrder = 1;
      this.sortField = value;
    }
  }

  deleteAssessment(id?: any){}
  editAssessment(id?: any){}

  isAssessmentToggle(event:any, id: any){}
  openDetailsModal(id: any){}
}
