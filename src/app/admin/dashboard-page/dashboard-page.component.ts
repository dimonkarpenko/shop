import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/shared/product.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-dashboard-page',
  templateUrl: './dashboard-page.component.html',
  styleUrls: ['./dashboard-page.component.scss']
})
export class DashboardPageComponent implements OnInit {

  products = []
  productSub: Subscription
  removeSub: Subscription
  productName
  
  constructor(
    private productServ: ProductService
  ) { }

  ngOnInit() {
    this.productSub = this.productServ.getAll().subscribe(products => {
      this.products = products
      console.log(products)
    })
  }

  ngOnDestroy() {
    if (this.productSub) {
      this.productSub.unsubscribe()
    }

    if (this.removeSub) {
      this.removeSub.unsubscribe()
    }
  }

  remove(id) {
    this.removeSub = this.productServ.remove(id).subscribe( () => {
      this.products = this.products.filter(product => product.id !== id)
    })
  }

}
