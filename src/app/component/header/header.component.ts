import { Component, OnInit,ElementRef, ViewChild } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  @ViewChild('navbarCollapse')
  navbarCollapse!: ElementRef;
  
  constructor() { }

  ngOnInit(): void {
  }
  toggleCollapse() {
    const collapse = this.navbarCollapse.nativeElement;
    if (collapse.classList.contains('show')) {
      collapse.classList.remove('show');
    } else {
      collapse.classList.add('show');
    }
  }
}
