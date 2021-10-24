import { Component, OnInit } from '@angular/core';
import { ActivatedUserService } from '@themost/angular';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css']
})
export class LayoutComponent implements OnInit {

  public user$: Observable<any>;

  constructor(private activatedUser: ActivatedUserService) {
    this.user$ = this.activatedUser.user.asObservable();
  }

  ngOnInit() {
  }

}
