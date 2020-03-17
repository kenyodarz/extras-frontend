import { TokenStorageService } from './services/token-storage.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"]
})
export class AppComponent implements OnInit {
  private roles: string[];
  isLoggedIn = false;
  showAdminBoard = false;
  showModeratorBoard = false;
  showSupervisorBoard = false;
  username: string;
  title = "extras-frontend";
  
  constructor (private tokenStorageService: TokenStorageService){}

  ngOnInit(): void {
    this.isLoggedIn = !!this.tokenStorageService.getToken();

    if(this.isLoggedIn) {
      const user = this.tokenStorageService.getUser();
      this.roles = user.roles;

      this.showAdminBoard = this.roles.includes('ROLE_ADMIN')
      this.showModeratorBoard = this.roles.includes('ROLE_MODERATOR')
      this.showSupervisorBoard = this.roles.includes('ROLE_SUPERVISOR')
    }
  }

  logout(){
    this.tokenStorageService.signOut();
    window.location.reload();
  }

}
