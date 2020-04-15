import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { OrderService } from 'src/app/shared/order.service';

@Component({
  selector: 'app-orders-page',
  templateUrl: './orders-page.component.html',
  styleUrls: ['./orders-page.component.scss']
})
export class OrdersPageComponent implements OnInit {

  orders = []
  productSub: Subscription
  removeSub: Subscription
   
  constructor(
    private orderServ: OrderService
  ) { }

  ngOnInit() {
    this.productSub = this.orderServ.getAll().subscribe(orders => {
      this.orders = orders
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
    this.removeSub = this.orderServ.remove(id).subscribe( () => {
      this.orders = this.orders.filter(order => order.id !== id)
    })
  }

}
