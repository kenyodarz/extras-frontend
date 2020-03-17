import { HTTP_INTERCEPTORS } from "@angular/common/http";
import { Injectable } from "@angular/core";
import {
  HttpInterceptor,
  HttpHandler,
  HttpRequest
} from "@angular/common/http";
//Servicio
import { TokenStorageService } from "src/app/services/token-storage.service";

const TOKEN_HEADER_KEY = 'Autorization';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
    constructor (private token: TokenStorageService){}
    intercept(req: HttpRequest<any>, next: HttpHandler){
        let autReq = req;
        const token = this.token.getToken();
        if(token != null){
          autReq = req.clone({headers: req.headers.set(TOKEN_HEADER_KEY,"Bearer ")})
        }
        return next.handle(autReq);
    }
}

export const authInterceptorProviders = [
  { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }
]

