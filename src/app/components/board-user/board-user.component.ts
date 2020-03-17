import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: "app-board-user",
  templateUrl: "./board-user.component.html",
  styleUrls: ["./board-user.component.scss"]
})
export class BoardUserComponent implements OnInit {
  content = "";

  constructor(private userService: UserService) {}

  ngOnInit() {
    this.userService.getUserBoard().subscribe(
      data => {
        this.content = data;
      },
      error => {
        this.content = JSON.parse(error.error).message;
      }
    );
  }
}
