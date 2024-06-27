import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { EditprofileComponent } from '../editprofile/editprofile.component';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  // profileimg:string='assets/profile.jpg';
  empoyeeid!: number;
  empoyeeData: any;
  empoyeeId: any;
  imageUrl: any;
  profileimg: any;

  constructor(private userservice:UserService,private route: ActivatedRoute,private dialog: MatDialog,) { }

  ngOnInit(): void {
    this.empoyeeId = this.route.snapshot.paramMap.get('id');
    // //console.log("id sjdhaklsjdh",this.empoyeeId)
    
      this.fetchEmployeeData(this.empoyeeId);
    
  }
  fetchEmployeeData(id: number): void {
    this.userservice.employeedetilesbyId(id).subscribe(data => {
      this.empoyeeData = data;
      // console.log("Employee Data:", this.empoyeeData);
      this.profileimg = this.empoyeeData.imageUrl;
    });
  }
  onSelectFile(event: any): void {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.imageUrl = e.target.result;
        this.profileimg = e.target.result;
      };
      reader.readAsDataURL(file);
    }
  }
   
  editProfile(empoyeeId:any): void {
    //console.log('Opening dialog with Employee ID:', empoyeeId);
    const dialogRef = this.dialog.open(EditprofileComponent, {
      width: '70%',
      height:'60%',
      data: { empoyeeId }
      
    });

    dialogRef.afterClosed().subscribe(result => {

    });
  }


}
