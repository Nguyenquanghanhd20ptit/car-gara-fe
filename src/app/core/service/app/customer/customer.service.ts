import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ConfigService } from '../../configuration/configuration.service';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

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

  searchCustomer(body : any){
    
    return this.http.post(`${this.baseUrl}/customer/search`,body).pipe(
      map((data : any) =>{
        return data;
      })
    )
  }
  
  getById(id : number){
    return this.http.get(`${this.baseUrl}/customer/${id}`).pipe(
      map((data : any) =>{
        return data;
      })
    )
  }
  
  update(id : number,body : any){
    return this.http.post(`${this.baseUrl}/customer/update/${id}`,body).pipe(
      map((data : any) =>{
        return data;
      })
    )
  }

  addNew(body : any){
    return this.http.post(`${this.baseUrl}/customer/addNew`,body).pipe(
      map((data : any) =>{
        return data;
      })
    )
  }
  delete(id : number){
    return this.http.delete(`${this.baseUrl}/customer/delete/${id}`).pipe(
      map((data : any) =>{
        return data;
      })
    )
  }

}
