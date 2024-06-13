import { Component, Inject, OnInit, inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { Router } from '@angular/router';
import { FormControl, FormGroup, Validators, FormBuilder } from '@angular/forms'

import { User } from 'src/app/model/user';
import { MatChipInputEvent } from '@angular/material/chips';
import { UserService } from 'src/app/services/user.service';


@Component({
  selector: 'app-editprofile',
  templateUrl: './editprofile.component.html',
  styleUrls: ['./editprofile.component.css']
})
export class EditprofileComponent implements OnInit {

  editForm!: FormGroup
  value: any;
  getNextId: any;
  response: any;
  empoyeeid: any;

  user: User = {
    address: '',
    age: 0,
    country: '',
    email: '',
    firstname: '',
    lastname: '',
    mobile: 0,
    state: '',
    tags: [],
    id: undefined
  }
  employeeId: any;
  employee: any;
  constructor(private router: Router,
    private dialogRef: MatDialogRef<EditprofileComponent>,
    private fb: FormBuilder,
    private userservice: UserService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  ngOnInit(): void {

  

    this.employee = this.data
    // console.log("this.employee", this.employee)
    this.employeeId = this.employee.empoyeeId
    
    // console.log(" this.employeeId = this.data.employeeId;",this.employeeId)
    this.loadEmployeeData();

    this.editForm = this.fb.group({
      firstname: [this.user.firstname, [Validators.required, Validators.minLength(3), Validators.pattern("[a-zA-Z].*")]],
      lastname: [this.user.lastname, [Validators.required, Validators.minLength(3), Validators.pattern("[a-zA-Z].*")]],
      email: [this.user.email, [Validators.required, Validators.email]],
      mobile: [this.user.mobile, [Validators.required, Validators.pattern("[0-9]*"), Validators.minLength(10), Validators.maxLength(10)]],
      age: [this.user.age, [Validators.required, Validators.minLength(20), Validators.maxLength(60)]],
      state: [this.user.state, [Validators.required]],
      country: [this.user.country, [Validators.required]],
      address: [this.user.address, [Validators.required]],
      tags: [this.user.tags]
    })
  }
  get FirstName(): FormControl {
    return this.editForm.get("firstname") as FormControl;
  }
  get LastName(): FormControl {
    return this.editForm.get("lastname") as FormControl;
  }
  get Email(): FormControl {
    return this.editForm.get("email") as FormControl;
  }
  get Mobile(): FormControl {
    return this.editForm.get("mobile") as FormControl;
  }

  get state(): FormControl {
    return this.editForm.get("state") as FormControl;
  }
  get country(): FormControl {
    return this.editForm.get("country") as FormControl;
  }
  get age(): FormControl {
    return this.editForm.get("age") as FormControl;
  }
  get address(): FormControl {
    return this.editForm.get("address") as FormControl;
  }
  get chipControl(): FormControl {
    return this.editForm.get("tags") as FormControl;
  }

  addressControl = new FormControl('');

  addOnBlur = true;
  readonly separatorKeysCodes = [ENTER, COMMA] as const;

  addTag(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;

  
    if ((value || '').trim()) {
      const tags = this.editForm.get('tags') as FormControl;
      const tagArray = tags.value;
      tagArray.push(value.trim());
      tags.setValue(tagArray);
    }

  
    if (input) {
      input.value = '';
    }
  }

  removeTag(tag: string): void {
    const tags = this.editForm.get('tags') as FormControl;
    const tagArray = tags.value;
    const index = tagArray.indexOf(tag);

    if (index >= 0) {
      tagArray.splice(index, 1);
      tags.setValue(tagArray);
    }
  }

  loadEmployeeData(){
    this.userservice.employeedetilesbyId(this.employeeId ).subscribe(
      (employee) => {
      //  console.log("employee",employee)
        this.editForm.patchValue(employee);
      },
      (error) => {
        // console.error('Error fetching employee data:', error);
      }
    )
  }


  update(data: any){
    this.dialogRef.close();
    // console.log("data",data)
    const formData = this.editForm.value 
    console.log("formData",formData)
    // if (formData.id) {
      this.userservice.updateEmployee( this.employeeId, formData).subscribe(
        (res: any) => {
          this.response = res;

          this.empoyeeid = this.response.id;
          // console.log("Updated empoyeeid", this.empoyeeid);

          this.editForm.reset();

          if (this.empoyeeid) {
               console.log("Update successful");
              this.router.navigate(['/profile', this.empoyeeid]);
          } else {
               console.error('Invalid user ID:', this.empoyeeid);
          }
      },
      error => {
          // console.error('Error updating user:', error);
      })

    // }
  }


}
