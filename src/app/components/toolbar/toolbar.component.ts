import { Component, OnInit } from "@angular/core";
import { TokenStorageService } from "src/app/services/token-storage.service"

@Component({
  selector: "app-toolbar",
  templateUrl: "./toolbar.component.html",
  styleUrls: ["./toolbar.component.scss"]
})
export class ToolbarComponent implements OnInit {
  appName = "CDM";
  private roles: string[];
  isLoggedIn = false;
  showAdminBoard = false;
  showModeratoBoard = false;
  username: string;
  showModeratorBoard: boolean;

  constructor(private tokenStorageService: TokenStorageService) {}

  ngOnInit() {
    this.isLoggedIn = !!this.tokenStorageService.getToken();
    if (this.isLoggedIn) {
      const user = this.tokenStorageService.getUser();
      this.roles = user.roles;
      this.showAdminBoard = this.roles.includes("ROLE_ADMIN");
      this.showModeratorBoard = this.roles.includes("ROLE_MODERATOR");
      this.username = user.username;
    }
  }
  logout() {
    this.tokenStorageService.singOut();
    window.location.reload();
  }
}
