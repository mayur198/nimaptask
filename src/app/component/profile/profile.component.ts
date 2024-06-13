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
  profileimg:string='assets/profile.jpg';
  empoyeeid!: number;
  empoyeeData: any;
  empoyeeId: any;

  constructor(private userservice:UserService,private route: ActivatedRoute,private dialog: MatDialog,) { }

  ngOnInit(): void {
    this.empoyeeId = this.route.snapshot.paramMap.get('id');
    // //console.log("id sjdhaklsjdh",this.empoyeeId)
    
      this.fetchEmployeeData(this.empoyeeId);
    
  }
  fetchEmployeeData(id: number): void {
    this.userservice.employeedetilesbyId(id).subscribe(data => {
      this.empoyeeData = data;
      //console.log("Employee Data:", this.empoyeeData);
    });
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
