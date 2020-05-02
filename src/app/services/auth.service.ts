import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";

const AUTH_API: string = "http://52.206.198.108:8080/extras-backend/api/auth/";

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
