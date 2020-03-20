import { Component, OnInit } from "@angular/core";
import { AuthService } from "src/app/services/auth.service";
import {
  Validators,
  FormControl,
  FormGroup,
  FormBuilder
} from "@angular/forms";
import { SelectItem } from "primeng/api";
import { MessageService } from "primeng/api";


@Component({
  selector: "app-register",
  templateUrl: "./register.component.html",
  styleUrls: ["./register.component.scss"],
  providers: [MessageService]
})
export class RegisterComponent implements OnInit {
  userform: FormGroup;
  submitted: boolean;
  genders: SelectItem[];
  description: string;
  form: any = {};
  isSuccessful = false;
  isSignUpFailed = false;
  errorMessage = "";

  constructor(
    private authService: AuthService,
    private fb: FormBuilder,
    private messageService: MessageService
  ) {}

  ngOnInit() {
    this.userform = this.fb.group({
      username: new FormControl("", Validators.required),
      email: new FormControl("", Validators.required),
      password: new FormControl(
        "",
        Validators.compose([Validators.required, Validators.minLength(6)])
      ),
      description: new FormControl(""),
      gender: new FormControl("", Validators.required)
    });

    this.genders = [];
    this.genders.push({ label: "Select Gender", value: "" });
    this.genders.push({ label: "Male", value: "Male" });
    this.genders.push({ label: "Female", value: "Female" });
  }

  onSubmit() {
    this.authService.register(this.form).subscribe(
      data => {
        console.log(data);
        this.isSuccessful = true;
        this.isSignUpFailed = false;
      },
      error => {
        this.errorMessage = error.error.message;
        this.isSignUpFailed = true;
      }
    );
  }
  get diagnostic() {
    return JSON.stringify(this.userform.value);
  }
}
