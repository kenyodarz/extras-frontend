import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";
import { Persona } from "src/app/models/Persona";

<<<<<<< HEAD
const API_URL: String = "http://3.16.116.229/ebackend/api/persona/";
=======
const API_URL: String =
  "http://52.206.198.108:8080/extras-backend/api/persona/";
>>>>>>> 844f9796e198e0ad0059af82dafed20c779ac2c5
@Injectable({
  providedIn: 'root'
})
export class PersonaService {
  

  constructor(private http: HttpClient) { }

  getAll(): Observable<any>{
    return this.http.get(API_URL + "all");
  }

  save (persona: Persona): Observable<any>{
    let headers = new HttpHeaders();
    headers = headers.set("Content-Type", "application/json")
    return this.http.post(API_URL + "save", JSON.stringify(persona), {
      headers: headers
    });
  }

  delete(id: string): Observable<any>{
    return this.http.get(API_URL + "delete/" +id);
  }

}
