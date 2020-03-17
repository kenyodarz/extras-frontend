import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";
import { Persona } from "src/app/models/Persona";

@Injectable({
  providedIn: 'root'
})
export class PersonaService {
  baseURL: String = "http://localhost:8080/api/persona"

  constructor(private http: HttpClient) { }

  getAll(): Observable<any>{
    return this.http.get(this.baseURL + "/all");
  }

  save (persona: Persona): Observable<any>{
    let headers = new HttpHeaders();
    headers = headers.set("Content","");
  }

}
