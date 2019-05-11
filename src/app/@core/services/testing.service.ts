import { ApiService } from './api.service';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class TestingService extends ApiService {

  quick(params: any) {
    return this.post('/rest/v1/testing/quick', params);
  }

  createKafkaTopic(params: any) {
    return this.post('/rest/v1/testing/kafka/create', params);
  }

  runAgent(params: any) {
    return this.post('/rest/v1/testing/agent/run', params);
  }

  executeTestCode(params: any) {
    return this.post('/rest/v1/testing/execute', params);
  }
}
