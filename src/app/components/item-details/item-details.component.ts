import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ConfirmationService } from 'primeng/api';
import { DataService } from 'src/app/service/data.service';
import { MessageService } from 'primeng/api';


@Component({
  selector: 'app-item-details',
  templateUrl: './item-details.component.html',
  styleUrls: ['./item-details.component.scss'],
})
export class ItemDetailsComponent implements OnInit, OnChanges {
  @Input() selectedItem: any;
  editUserForm: FormGroup | any;
  editEnable: boolean = false;
  userPosts: any = [];
  fromDashboard: boolean = false;
  userID: any;
  submitted: boolean = false;

  constructor(private fb: FormBuilder, private dataService: DataService, 
              private confirmationService: ConfirmationService,
              private router: Router, private route: ActivatedRoute,
              private toast: MessageService) { 
  }

  ngOnInit(): void {
    console.log("selectedItemselectedItem ", this.selectedItem);
    this.initForm();
    if(this.router.url=='/' || this.router.url == '' || this.router.url == '/home') {
      this.fromDashboard = true;
    }
    if(!this.selectedItem) {
      this.userID = this.route.snapshot.params['id'];
      if(this.userID) {
      this.dataService.getUsersByID(this.userID).subscribe((resp: any) => {
        this.selectedItem = resp;
        this.patchFormValues(this.selectedItem);
        // this.getUserPosts(this.selectedItem.id)
      });
    }
    }
  }

  getMoreDetails() {
    console.log("this.fromDashboard ", this.fromDashboard)
    if(this.fromDashboard) {
        this.router.navigate(['user/details', this.selectedItem.id])
    }
  }

  ngOnChanges (changes:SimpleChanges){
    if(changes&&changes['selectedItem'] && changes['selectedItem'].currentValue !== changes['selectedItem'].previousValue) {
        this.patchFormValues(changes['selectedItem'].currentValue);
        this.editEnable = false;
        // this.getUserPosts(this.selectedItem.id)
    }
  }

  patchFormValues(data: any) {
    console.log("datadatadatadata", data)
    this.editUserForm.patchValue(data);
  }
  
  initForm() {
    console.log("selecteD ", this.selectedItem);
    this.editUserForm = this.fb.group({
      firstName: [this.selectedItem && this.selectedItem.firstName?this.selectedItem.firstName:'', Validators.required],
      lastName: [this.selectedItem && this.selectedItem.lastName?this.selectedItem.lastName:'', Validators.required],
      userName: [this.selectedItem && this.selectedItem.userName?this.selectedItem.userName:'', Validators.required],
      address: [this.selectedItem && this.selectedItem.address?this.selectedItem.address:'', Validators.required],
      company: [this.selectedItem && this.selectedItem.company?this.selectedItem.company:'', Validators.required],
      contact: [this.selectedItem && this.selectedItem.contact?this.selectedItem.contact:'', Validators.required],
      // gender: [this.selectedItem && this.selectedItem.gender?this.selectedItem.gender:'', Validators.required],
      job: [this.selectedItem && this.selectedItem.job?this.selectedItem.job:'', Validators.required],
      email: [this.selectedItem && this.selectedItem.email?this.selectedItem.email:'', Validators.required, Validators.email],
      summary: [this.selectedItem && this.selectedItem.summary?this.selectedItem.summary:'', Validators.required]
    });
    // this.editUserForm.disable();
  }

  get validateChk(): any {
    // Convenience getter for easy access to form fields
    return this.editUserForm.controls;
  }

  updateUser(id?: any) {
    this.submitted = true;
    let payload: any = {};
    payload = this.editUserForm.value;
    console.log("payload ", payload);
    if(!this.editUserForm.invalid) {
    this.dataService.updateUser(id, payload).subscribe({
      next: (val: any) => {
        this.toast.add({severity:"success",summary:"Success", detail:"User Added Successfully",life:30000});
      },
      error: (error: any) => {
        console.error(error);
      }
    });
  } else {
    this.toast.add({severity:'warning', summary:'Warning', detail:'Please fill all the feilds'})
  }
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

}
