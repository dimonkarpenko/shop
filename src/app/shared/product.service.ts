import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';
import { fbResponse, Product } from './interfaces';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  type = 'phone'

  constructor(private  http : HttpClient) { }

  create(product) {
    return this.http.post(`${environment.fbdbURL}/products.json`, product)
    .pipe(map( (res : fbResponse) => {
      return {
        ...product,
        id: res.name,
        date: new Date(product.date)
      }
    }))
  }

  getAll() {
    return this.http.get(`${environment.fbdbURL}/products.json`)
    .pipe( map ( res => {
      return Object.keys(res)
      .map( key => ({
        ...res[key],
        id: key,
        date: new Date(res[key].date)
      }))
    }))
  }

  getById(id) {
    return this.http.get(`${environment.fbdbURL}/products/${id}.json`)
    .pipe( map ( (res: Product) => {
      return {
        ...res,
        id,
        date: new Date(res.date)
      }
    }))
  }

  remove (id) {
    return this.http.delete(`${environment.fbdbURL}/products/${id}.json`)
  }

  update(product: Product) {
    return this.http.patch(`${environment.fbdbURL}/products/${product.id}.json`, product)
  }

  setType (type) {
    this.type = type
  }
}
