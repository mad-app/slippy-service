import { of as observableOf,  Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { Product, StoreData } from '../data/store'

@Injectable()
export class StoreService extends StoreData {
  products : Product[] = [
    { name: 'Prod1', createAt : 1553498875334, desc: 'this is product1'},
    { name: 'Prod2', createAt : 1553498875335, desc: 'this is product2'},
    { name: 'Prod3', createAt : 1553498875337, desc: 'this is product3'},
    { name: 'Prod4', createAt : 1553498875338, desc: 'this is product4'},
    { name: 'Prod5', createAt : 1553498875340, desc: 'this is product5'},
  ];

  getProducts(): Observable<Product[]> {
    return observableOf(this.products);
  }
}
