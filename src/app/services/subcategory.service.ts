import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { SubCategory } from './../entities/sub-category';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SubcategoryService {

  constructor(private http: HttpClient) { }
  
  subcategory='/ef/public/pm/subcat';

  addSubCategory(body: SubCategory): Observable<SubCategory>{
    return this.http.post<SubCategory>(environment.serverUrl+this.subcategory+'/add',body);
  }

  getActiveSubCategoryByCategoryId(id: string): Observable<SubCategory[]>{
    return this.http.get<SubCategory[]>(environment.serverUrl+this.subcategory+'/getActiveSubCategoryByCategoryId/'+id);
  }

  getSubCategoryByCategoryId(id: string): Observable<SubCategory[]>{
    return this.http.get<SubCategory[]>(environment.serverUrl+this.subcategory+'/getSubCategoryByCategoryId/'+id);
  }

  activateSubCategory(id: string): Observable<SubCategory>{
    return this.http.get<SubCategory>(environment.serverUrl+this.subcategory+'/activateSubCategory/'+id);
  }
  
  getSubCategoryById(id: string): Observable<SubCategory>{
    return this.http.get<SubCategory>(environment.serverUrl+this.subcategory+'/getSubCategoryBySubCategoryId/'+id);
  }

  getAllActiveSubCategories(): Observable<SubCategory[]>{
    return this.http.get<SubCategory[]>(environment.serverUrl+this.subcategory+'/getAllActiveSubCategories');
  }
}

