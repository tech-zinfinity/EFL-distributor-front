import { ProductShortInfo } from './../entities/product-short-info';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { Product } from './../entities/product';
import { environment } from 'src/environments/environment';
import { Cacheable } from 'ngx-cacheable';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  filter(arg0: (data: any) => any): Product {
    throw new Error("Method not implemented.");
  }
  next(product: Product) {
    throw new Error("Method not implemented.");
  }

  constructor(private http: HttpClient) { }

  product ='/ef/public/pm/product';

  dummyProductActiveList: Product[] = [];
  productActiveSource = new BehaviorSubject(this.dummyProductActiveList);
  productActiveListObservable = this.productActiveSource.asObservable();


  getAllActiveProductsBySubCategoryId(id: string):Observable<Product[]>{
    return new Observable(observer =>{
      this.http.get<Product[]>(environment.serverUrl+this.product+'/getAllActiveProductsBySubCategoryId/'+id)
      .subscribe(data =>{
        this.productActiveSource.next(data);
        observer.next(data);
        observer.complete();
      })
    });
  }

  @Cacheable()
  getAllActiveProducts():Observable<ProductShortInfo[]>{
    return new Observable(observer =>{
      this.http.get<ProductShortInfo[]>(environment.serverUrl+this.product+'/getActiveProducts')
      .subscribe(data =>{
        observer.next(data);
        observer.complete();
      })
    });
  }

  addProduct(product: Product):Observable<Product>{
    return new Observable(observer =>{
      this.http.post<Product>(environment.serverUrl+this.product+'/add', product)
      .subscribe(data =>{
        observer.next(data);
        observer.complete();
      })
    });
  }

  addPhotoInProduct(id: string, photos:string[]):Observable<Product>{
    return new Observable(observer =>{
      let body = {
        id: id,
        images: photos
      }
      this.http.post<Product>(environment.serverUrl+this.product+'/addPhoto', body)
      .subscribe(data =>{
        observer.next(data);
        observer.complete();
      })
    });
  }

  getProductById(id: string):Observable<Product>{
    return new Observable(observer =>{
      this.http.get<Product>(environment.serverUrl+this.product+'/getProductByProductId/'+id)
      .subscribe(data =>{
        observer.next(data);
        observer.complete();
      })
    });
  }

  saerchProductByString(string: string):Observable<Product[]>{
    return new Observable(observer =>{
      this.http.get<Product[]>(environment.serverUrl+this.product+'/searchByName/'+string)
      .subscribe(data =>{
        observer.next(data);
        observer.complete();
      })
    });
  }


  getAllProductsBySubCategoryId(id: string):Observable<Product[]>{
    return new Observable(observer =>{
      this.http.get<Product[]>(environment.serverUrl+this.product+'/getAllProductsBySubCategoryId/'+id)
      .subscribe(data =>{
        observer.next(data);
        observer.complete();
      })
    });
  }

  activateProductById(id: string):Observable<Product>{
    return new Observable(observer =>{
      this.http.get<Product>(environment.serverUrl+this.product+'/activateProductInSubcategory/'+id)
      .subscribe(data =>{
        observer.next(data);
        observer.complete();
      })
    });
  }


}
