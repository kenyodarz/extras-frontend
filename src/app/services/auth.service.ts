import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";

<<<<<<< HEAD
<<<<<<< HEAD
const AUTH_API: string = "http://3.16.116.229/ebackend/api/auth/";
=======
const AUTH_API: string = "http://52.206.198.108:8080/extras-backend/api/auth/";
>>>>>>> 844f9796e198e0ad0059af82dafed20c779ac2c5
=======
const AUTH_API: string = "http://186.114.95.46/extras-backend/api/auth/";
>>>>>>> parent of 8e56f98... Version 1.0.0.0

const httpOptions = {
  headers: new HttpHeaders({ "Content-Type": "application/json" })
};

@Injectable({
  providedIn: "root"
})
export class AuthService {
  constructor(private http: HttpClient) {}
  
  login (credentials): Observable<any>{
    return this.http.post(AUTH_API+"signin",{
      username: credentials.username,
      password: credentials.password
    },httpOptions)
  }

  register(user): Observable<any>{
    return this.http.post(AUTH_API+"signup",{
      username: user.username,
      email: user.email,
      password: user.password
    }, httpOptions)
  }


}
