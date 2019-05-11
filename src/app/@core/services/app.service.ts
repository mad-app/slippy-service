import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { ApiService } from './api.service';
import { SlippyApp } from '../data/slippy_data/app';

@Injectable({
  providedIn: 'root'
})
export class AppService extends ApiService {
  create(body: any) {
    return this.post('/rest/v1/marketplace/create', body);
  }

  getAll() : Observable<SlippyApp[]> {
    return this.get<SlippyApp[]>('/rest/v1/marketplace/getAll');
  }
}
