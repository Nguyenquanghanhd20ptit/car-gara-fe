import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ConfigService } from '../../configuration/configuration.service';
import { map } from "rxjs/operators";
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  selectedProducts: any = [];

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
    return this.http.post(`${this.baseUrl}/order/search`,body).pipe(
      map((data : any) =>{
        return data;
      })
    )
  }
  
  getById(id : number){
    return this.http.get(`${this.baseUrl}/order/${id}`).pipe(
      map((data : any) =>{
        return data;
      })
    )
  }
  
  addNew(body : any){
    return this.http.post(`${this.baseUrl}/order/addNew`,body).pipe(
      map((data : any) =>{
        return data;
      })
    )
  }
  
  update(id : number,body : any){
    return this.http.post(`${this.baseUrl}/order/update/${id}`,body).pipe(
      map((data : any) =>{
        return data;
      })
    )
  }

  updateStatusOrderIsSuccess(id: number): Observable<any> {
    const params = new HttpParams().set('id', id.toString());
    return this.http.post(`${this.baseUrl}/order/update-status/isPaid`, null, { params });
  }
}
