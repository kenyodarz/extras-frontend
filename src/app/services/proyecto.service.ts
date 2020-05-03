import { Proyecto } from "./../models/Proyecto";
import { Observable } from "rxjs";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";


const API_URL: String = "http://3.16.116.229/ebackend/api/proyecto/";

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
