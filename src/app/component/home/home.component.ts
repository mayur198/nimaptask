import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";

import { MatDialog } from '@angular/material/dialog';

import { RegisterComponent } from '../register/register.component';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(
    private  router: Router,
    private dialog: MatDialog,
  ) { }

  ngOnInit(): void {
  }

  register(): void {
    // this.router.navigate(['/register']);;
    
    const dialogRef = this.dialog.open(RegisterComponent, {
      width: '70%',
      height:'60%',
     
    });

    dialogRef.afterClosed().subscribe(result => {
      // console.log('The dialog was closed');
      
    });
  }

}
