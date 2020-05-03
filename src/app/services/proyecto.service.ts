import { Proyecto } from "./../models/Proyecto";
import { Observable } from "rxjs";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";

<<<<<<< HEAD
<<<<<<< HEAD
const API_URL: String = "http://3.16.116.229/ebackend/api/proyecto/";
=======
const API_URL: String =
  "http://52.206.198.108:8080/extras-backend/api/proyecto/";
>>>>>>> 844f9796e198e0ad0059af82dafed20c779ac2c5
=======
const API_URL: String = "http://186.114.95.46/extras-backend/api/proyecto/";
>>>>>>> parent of 8e56f98... Version 1.0.0.0
@Injectable({
  providedIn: "root"
})
export class ProyectoService {
  constructor(private http: HttpClient) {}

  getAll(): Observable<any> {
    return this.http.get(API_URL + "all");
  }

  save(proyecto: Proyecto): Observable<any> {
    let headers = new HttpHeaders();
    headers = headers.set("Content-Type", "application/json");
    return this.http.post(API_URL + "save", JSON.stringify(proyecto), {
      headers: headers
    });
  }

  delete(id: string): Observable<any> {
    return this.http.get(API_URL + "delete/" + id);
  }
}
