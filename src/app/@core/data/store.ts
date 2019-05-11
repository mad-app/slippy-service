import { Observable } from 'rxjs';

export interface Product {
  name : string,
  createAt: Number,
  desc : string
}

export abstract class StoreData {
  abstract getProducts(): Observable<Product[]>;
}