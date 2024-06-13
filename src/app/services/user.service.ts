import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class UserService {
  

  constructor(private http: HttpClient) { }

 
  registerUser(data: any){
    return this.http.post("http://localhost:3000/resister", data);
  }
 

  employeedetilesbyId(id: number): Observable<any> {
    return this.http.get(`http://localhost:3000/resister/${id}`);
  }

  updateEmployee(id: any, data: any) {
    return this.http.put(`http://localhost:3000/resister/${id}`, data);
  }
}
