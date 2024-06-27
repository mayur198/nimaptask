import { Component, OnInit, inject } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { Router } from '@angular/router';
import { FormControl, FormGroup, Validators, FormBuilder } from '@angular/forms'

import { User } from 'src/app/model/user';
import { MatChipInputEvent } from '@angular/material/chips';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  srcc: string = '../assets/profileavtar..jpg'

  user: User = {
    //  image: '',
    age: 0,
    country: '',
    email: '',
    firstname: '',
    lastname: '',
    mobile: 0,
    state: '',
    tags: [],
    imageUrl: '',
    id: undefined
  }
  // console.log("interfacce",userform)

  registerForm!: FormGroup
  value: any;
  getNextId: any;
  response: any;
  empoyeeid: any;
  selectedAddress: string = '';
  imageUrl: string | ArrayBuffer | null = null;
  selectedFile: any;

  constructor(private router: Router,
    private dialogRef: MatDialogRef<RegisterComponent>,
    private fb: FormBuilder,
    private userservice: UserService,

  ) { }

  ngOnInit(): void {
    this.registerForm = this.fb.group({
      firstname: [this.user.firstname, [Validators.required, Validators.minLength(3), Validators.pattern("[a-zA-Z].*")]],
      lastname: [this.user.lastname, [Validators.required, Validators.minLength(3), Validators.pattern("[a-zA-Z].*")]],
      email: [this.user.email, [Validators.required, Validators.email]],
      mobile: [this.user.mobile, [Validators.required, Validators.pattern("[0-9]*"), Validators.minLength(10), Validators.maxLength(10)]],
      age: [this.user.age, [Validators.required, Validators.minLength(20), Validators.maxLength(60)]],
      state: [this.user.state, [Validators.required]],
      country: [this.user.country, [Validators.required]],
      // address: [this.user.address, [Validators.required]],
      homeAddress1: [''],
      homeAddress2: [''],
      companyAddress1: [''],
      companyAddress2: [''],
      tags: [this.user.tags],
      imageUrl: ['']
    })
  }









  get FirstName(): FormControl {
    return this.registerForm.get("firstname") as FormControl;
  }
  get LastName(): FormControl {
    return this.registerForm.get("lastname") as FormControl;
  }
  get Email(): FormControl {
    return this.registerForm.get("email") as FormControl;
  }
  get Mobile(): FormControl {
    return this.registerForm.get("mobile") as FormControl;
  }

  get state(): FormControl {
    return this.registerForm.get("state") as FormControl;
  }
  get country(): FormControl {
    return this.registerForm.get("country") as FormControl;
  }
  get age(): FormControl {
    return this.registerForm.get("age") as FormControl;
  }
  get address(): FormControl {
    return this.registerForm.get("address") as FormControl;
  }
  get chipControl(): FormControl {
    return this.registerForm.get("tags") as FormControl;
  }

  addressControl = new FormControl('');

  addOnBlur = true;
  readonly separatorKeysCodes = [ENTER, COMMA] as const;


  addTag(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;


    if ((value || '').trim()) {
      const tags = this.registerForm.get('tags') as FormControl;
      const tagArray = tags.value;
      tagArray.push(value.trim());
      tags.setValue(tagArray);
    }

    if (input) {
      input.value = '';
    }
  }

  removeTag(tag: string): void {
    const tags = this.registerForm.get('tags') as FormControl;
    const tagArray = tags.value;
    const index = tagArray.indexOf(tag);

    if (index >= 0) {
      tagArray.splice(index, 1);
      tags.setValue(tagArray);
    }
  }


  // onSelectFile(event: any): void {
  //   if (event.target.files && event.target.files[0]) {
  //     const file = event.target.files[0];
  //     const reader = new FileReader();
  //     reader.onload = (e: any) => {
  //       this.imageUrl = e.target.result;
  //       this.srcc = e.target.result;
  //     };
  //     reader.readAsDataURL(file);
  //   }
  // }
  onSelectFile(event: any): void {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.imageUrl = e.target.result;
        this.srcc = e.target.result;
        this.registerForm.patchValue({
          imageUrl: this.imageUrl
        });
      };
      reader.readAsDataURL(file);
    }
  }

  RESubmit(data: any) {

    this.dialogRef.close();

    const formData = this.registerForm.value as User
    console.log("const formData", formData)
    
    
    this.userservice.registerUser(formData).subscribe(

      (res: any) => {
        this.response = res


        this.empoyeeid = this.response.id;
        // console.log("empoyeeid", this.empoyeeid)

        this.registerForm.reset();


        if (this.empoyeeid) {
          // console.log("IN JUHFDWAIS")
          this.router.navigate(['/profile', this.empoyeeid]);
        } else {
          console.error('Invalid user ID:', this.empoyeeid);

        }
      },
      error => {
        // console.error('Error registering user:', error);
      }


    );

  }
  // RESubmit(data: any): void {
  //   if (!this.selectedFile) {
  //     // Handle error: no file selected
  //     return;
  //   }

  //   const formData = new FormData();
  //   formData.append('firstname', this.registerForm.get('firstname')?.value);
  //   formData.append('lastname', this.registerForm.get('lastname')?.value);
  //   formData.append('email', this.registerForm.get('email')?.value);
  //   formData.append('mobile', this.registerForm.get('mobile')?.value);
  //   formData.append('age', this.registerForm.get('age')?.value);
  //   formData.append('state', this.registerForm.get('state')?.value);
  //   formData.append('country', this.registerForm.get('country')?.value);
  //   formData.append('tags', JSON.stringify(this.registerForm.get('tags')?.value));
  //   formData.append('image', this.selectedFile);
 
  //   console.log("formData",formData)
  //   this.userservice.registerUser(formData).subscribe(
  //     (res: any) => {
  //       this.dialogRef.close();
  //       this.router.navigate(['/profile', res.id]);
  //     },
  //     error => {
  //       console.error('Error registering user:', error);
  //     }
  //   );
  // }
 
  onAddressChange(event: Event): void {

    const selectElement = event.target as HTMLSelectElement;
    this.selectedAddress = selectElement.value;

  }
  }



