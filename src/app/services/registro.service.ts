import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";

/* Modelo */
import { Registro } from "../models/Registro";

@Injectable({
  providedIn: "root"
})
export class RegistroService {
  baseURL: string = "http://52.206.198.108:8080/extras-backend/api/registro";
  constructor(private http: HttpClient) {}

  getAll(): Observable<any> {
    return this.http.get(this.baseURL + "/all");
  }

  save(registro: Registro): Observable<any> {
    let headers = new HttpHeaders();
    headers = headers.set("Content-Type", "application/json");
    return this.http.post(this.baseURL + "/save", JSON.stringify(registro), {
      headers: headers
    });
  }

  delete(id: number): Observable<any> {
    return this.http.get(this.baseURL + "/delete/" + id);
  }
}
