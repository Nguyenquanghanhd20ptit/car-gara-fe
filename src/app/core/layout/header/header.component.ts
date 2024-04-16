import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  isLoggedIn: boolean = false;
  showUserProfile: boolean = false;

  constructor() { }

  ngOnInit(): void {
    this.isLoggedIn = true;
  }

  openUserProfile(): void {
    this.showUserProfile = !this.showUserProfile;
  }

  logout(): void {
    this.isLoggedIn = false;
    this.showUserProfile = false;
  }
}