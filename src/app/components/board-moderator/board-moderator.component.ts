import { Component, OnInit } from '@angular/core';
import { UserService } from "src/app/services/user.service";

@Component({
  selector: "app-board-moderator",
  templateUrl: "./board-moderator.component.html",
  styleUrls: ["./board-moderator.component.scss"]
})
export class BoardModeratorComponent implements OnInit {
  content = "";

  constructor(private userService: UserService) {}

  ngOnInit() {
    this.userService.getModeratorBoard().subscribe(
      data => {
        this.content = data;
      },
      error => {
        this.content = JSON.parse(error.error).message;
      }
    );
  }
}
