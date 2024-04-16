import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { ConfigService } from '../../configuration/configuration.service';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CarService {
  baseUrl = "";
  constructor(private http : HttpClient, private config : ConfigService) {
    this.baseUrl =
    (this.config &&
    this.config.config &&
    this.config.config.API_ENDPOINTS &&
    this.config.config.API_ENDPOINTS.AUTH_API_URL
      ? this.config.config.API_ENDPOINTS.AUTH_API_URL
      : '') ;
  }
  search(body : any){
    return this.http.post(`${this.baseUrl}/car/search`,body).pipe(
      map((data : any) =>{
        return data;
      })
    )
  }
}



