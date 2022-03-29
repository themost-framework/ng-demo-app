import { Component, OnInit, ViewChild } from '@angular/core';
import { DataComponent } from '@themost/angular';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html'
})
export class ProductListComponent implements OnInit {

  @ViewChild('products', { static: true }) products: DataComponent;
  public searchText: string;

  constructor() { }

  ngOnInit(): void {
  }

  onScrollDown() {
    if (this.products == null) {
      return;
    }
    if (this.products.value == null) {
      return;
    }
    if (this.products.value.length >= this.products.total) {
      return;
    }
    this.products.top = this.products.top + 25;
    this.products.fetch();
  }

  search(text: string): void {
    if (text && text.length === 0) {
      this.products.filter = null;
    } else {
      this.products.filter = `indexof(name, '${text}') ge 0`;
    }
    this.products.fetch();
  }

}
