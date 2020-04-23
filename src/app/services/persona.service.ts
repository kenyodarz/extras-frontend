import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";
import { Persona } from "src/app/models/Persona";

const API_URL: String = "http://localhost:8080/extras-backend/api/persona/";
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
