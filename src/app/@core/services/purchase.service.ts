import { Injectable } from '@angular/core';

import { ApiService } from './api.service';
import { SlippyApp } from '../data/slippy_data/app';

@Injectable({
  providedIn: 'root'
})
export class PurchaseService extends ApiService {
  buy(body: any) {
    return this.post('/rest/v1/purchase/buy', body);
  }

  getMyApp(userName: string) {
    return this.get<SlippyApp[]>('/rest/v1/purchase/myApps/' + userName);
  }
}
