import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AngularDataContext } from '@themost/angular';
import { ListResponse } from '@themost/client';
import { Observable, Subscription, from, of } from 'rxjs';

@Component({
  selector: 'app-customer-view',
  templateUrl: './customer-view.component.html'
})
export class CustomerViewComponent implements OnInit, OnDestroy {
  paramSubscription: Subscription;
  public customer$: Observable<any> = of();
  public orders$: Observable<ListResponse<any>> = of();
  public countries$ = from(this.context.model('Countries').select('id', 'name', 'cca2').orderBy('name').take(-1).getItems());

  constructor(private context: AngularDataContext, private activatedRoute: ActivatedRoute, private router: Router) { }
  ngOnDestroy(): void {
    if (this.paramSubscription) {
      this.paramSubscription.unsubscribe();
    }
  }

  ngOnInit(): void {
    this.paramSubscription = this.activatedRoute.params.subscribe((params) => {
      this.customer$ = from(this.context.model('People').where('id').equal(params.id).expand('user').getItem());
      this.orders$ = from(
        this.context.model('Orders').where('customer').equal(params.id).expand('orderedItem')
          .orderByDescending('orderDate').take(5).getList()
        );
    });
  }

  save(customer: any): void {
    this.context.model('People').save(customer).then(() => {
      return this.router.navigate([ '/customers' ]);
    });
  }

}
