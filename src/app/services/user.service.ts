import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";

<<<<<<< HEAD
<<<<<<< HEAD
const API_URL = "http://3.16.116.229/ebackend/api/test/";
=======
const API_URL = "http://52.206.198.108:8080/extras-backend/api/test/";
>>>>>>> 844f9796e198e0ad0059af82dafed20c779ac2c5
=======
const API_URL = "http://186.114.95.46/extras-backend/api/test/";
>>>>>>> parent of 8e56f98... Version 1.0.0.0

@Injectable({
  providedIn: "root"
})
export class UserService {
  constructor(private http: HttpClient) {}

  getPublicContent(): Observable<any> {
    return this.http.get(API_URL + "all", { responseType: "text" });
  }

  getUserBoard(): Observable<any> {
    return this.http.get(API_URL + "user", { responseType: "text" });
  }

  getModeratorBoard(): Observable<any> {
    return this.http.get(API_URL + "mod", { responseType: "text" });
  }

  getAdminBoard(): Observable<any> {
    return this.http.get(API_URL + "admin", { responseType: "text" });
  }
}
