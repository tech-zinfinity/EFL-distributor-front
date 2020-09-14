import { Category } from './../entities/category';
import { environment } from './../../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Cacheable } from 'ngx-cacheable';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private http: HttpClient) { }

  category='/ef/public/pm/category';

  getAllCategories(): Observable<Category[]>{
    return this.http.get<Category[]>(environment.serverUrl+this.category+'/getAll');
  }

  getAllActiveCategories(): Observable<Category[]>{
    return this.http.get<Category[]>(environment.serverUrl+this.category+'/getAllActive');
  }

  addCategory(body: Category): Observable<Category>{
    return this.http.post<Category>(environment.serverUrl+this.category+'/add',body);
  }

  activateCategory(id: string): Observable<Category>{
    return this.http.get<Category>(environment.serverUrl+this.category+'/activateCategory/'+id);
  }

  getCategoryById(id: string): Observable<Category>{
    return this.http.get<Category>(environment.serverUrl+this.category+'/getCategoryById/'+id);
  }  
}
