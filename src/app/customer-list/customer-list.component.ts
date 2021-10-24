import { Component, OnChanges, OnDestroy, OnInit, SimpleChanges } from '@angular/core';
import { ClientDataQueryable } from '@themost/client';
import { ActivatedUserService } from 'projects/angular/src/auth';
import { AngularDataContext } from 'projects/angular/src/client';
import { Observable, Subscription } from 'rxjs';

@Component({
  selector: 'app-customer-list',
  templateUrl: './customer-list.component.html'
})
export class CustomerListComponent implements OnInit, OnDestroy {

  public items: { total: number; skip: number; value: any[] };
  public query: ClientDataQueryable;
  public searchText: string;
  subscription: Subscription;
  throttle = 300;
  scrollDistance = 1;
  scrollUpDistance = 2;
  pageSize = 25;

  constructor(private context: AngularDataContext,
    private activatedUser: ActivatedUserService) {
    //
  }
  search(text: string): void {
    this.query = this.context.model('People').where('givenName').contains(text)
      .or('familyName').contains(text)
      .or('email').contains(text)
      .or('address/addressLocality').contains(text)
      .or('address/streetAddress').contains(text)
      .skip(0).take(this.pageSize);
      this.query.getList().then((result) => {
        this.items = result;
      });
  }
  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  ngOnInit() {
    this.subscription = this.activatedUser.user.subscribe(() => {
      this.query = this.context.model('People').asQueryable().expand('address').skip(0).take(this.pageSize);
      this.query.getList().then((result) => {
        this.items = result;
      });
    });
  }

  onScrollDown() {
    if (this.items == null) {
      return;
    }
    if (this.items.skip >= this.items.total) {
      return;
    }
    this.query.takeNext(this.pageSize).getList().then((result) => {
      // append items
      this.items.value.push.apply(this.items.value, result.value);
      // assign params
      Object.assign(this.items, {
        skip: result.skip,
        total: result.total
      });
    });
  }

}
