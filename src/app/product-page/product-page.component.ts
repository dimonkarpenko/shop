import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../shared/product.service';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-product-page',
  templateUrl: './product-page.component.html',
  styleUrls: ['./product-page.component.scss']
})
export class ProductPageComponent implements OnInit {

  product$

  constructor(
    private productServ: ProductService,
    private route: ActivatedRoute
    ) { }

  ngOnInit() {
    this.product$ = this.route.params
    .pipe( switchMap(params => {
      return this.productServ.getById(params['id'])
    }))
  }

}
