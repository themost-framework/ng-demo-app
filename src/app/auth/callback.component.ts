import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AngularDataContext } from '@themost/angular';
import { Subscription } from 'rxjs';
import { ActivatedUserService } from './activated-user.service';

@Component({
  selector: 'app-callback',
  template: `
  <div></div>
  `
})
export class CallbackComponent implements OnInit, OnDestroy {
  private subscription: Subscription;

  constructor(private activatedRoute: ActivatedRoute,
    private context: AngularDataContext,
    private activatedUser: ActivatedUserService,
    private router: Router) { }
  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  ngOnInit() {
    this.subscription = this.activatedRoute.queryParams.subscribe((queryParams) => {
      if (queryParams.access_token) {
        this.context.setBearerAuthorization(queryParams.access_token);
      }
      this.context.model('Users/Me').asQueryable().expand('groups').getItem().then((user) => {
        const authorizedUser = Object.assign(user, {
          token: {
            access_token: queryParams.access_token
          }
        });
        this.activatedUser.set(authorizedUser);
        this.activatedUser.user.next(authorizedUser);
        return this.router.navigate([ "/" ]);
      });
    });
  }

}
