import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ConfigService } from '../../configuration/configuration.service';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AccessoryService {
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
  searchAccessory(body : any){
    
    return this.http.post(`${this.baseUrl}/accessory/search`,body).pipe(
      map((data : any) =>{
        return data;
      })
    )
  }
}
