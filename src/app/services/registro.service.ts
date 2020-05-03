import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";

/* Modelo */
import { Registro } from "../models/Registro";

@Injectable({
  providedIn: "root"
})
export class RegistroService {
<<<<<<< HEAD
  baseURL: string = "http://3.16.116.229/ebackend/api/registro";
=======
  baseURL: string = "http://52.206.198.108:8080/extras-backend/api/registro";
>>>>>>> 844f9796e198e0ad0059af82dafed20c779ac2c5
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
