import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AppService, TestingService } from '../../../../@core/services';
import { SlippyApp } from '../../../../@core/data/slippy_data/app';

const KAFKA_HOST = 'KAFKA_HOST=172.30.100.108';
const KAFKA_PORT = 'KAFKA_PORT=9092';
const KAFKA_TOPIC_VARIABLE = 'KAFKA_TOPIC';
const NETWORK_ENDPOINT = 'dev-net';

@Component({
  selector: 'slp-load-app',
  templateUrl: './load-app.component.html',
  styleUrls: ['./load-app.component.scss'],
})

export class LoadAppComponent implements OnInit {
  appName: string;
  apps: Observable<SlippyApp[]>;
  agentCount: string;
  topic: string;

  constructor(
    private data: AppService,
    private api: TestingService,
    private route: ActivatedRoute,
    private router: Router) {
    this.apps = data.getAll();
  }

  ngOnInit() {
    this.appName = this.route.snapshot.queryParamMap.get('appName');
  }

  async createAgent() {
    try {
      const topic = !this.topic || this.topic.length === 0 ? generateTopic(16) : this.topic;
      console.log(`topic: ${topic}`);

      const agentParams = {
        kafkaTopic: topic,
        containerEnv: [KAFKA_HOST, KAFKA_PORT, `${KAFKA_TOPIC_VARIABLE}=${topic}`],
        networkEndpoint: NETWORK_ENDPOINT,
        count: +this.agentCount,
      };
      const agentResult = await getApiServerResult(this.api, this.api.runAgent, agentParams);
      if (agentResult.runErrorCount != 0) {
        // TODO: show error
        console.log(`run agent error: ${agentResult}`);
      } else {
        console.log(`run agent complete: ${agentResult}`);
        this.topic = topic;
      }
    } catch (err) {
      console.log('create agnet error:', err);
    }
  }

  async runTestCode() {
    if (!this.topic) {
      console.log('input topic!');
      return;
    }
    try {
      const testcodeParams = {
        appName: this.appName,
        topic: this.topic,
      };
      const testcodeResult = await getApiServerResult(this.api, this.api.executeTestCode, testcodeParams);
      if (testcodeResult.code !== 0) {
        console.log(`execute testCode error: ${testcodeResult}`);
      } else {
        console.log(`execute testCode complete: ${testcodeResult}`);
      }
    } catch (err) {
      console.log('run test code error:', err);
    }
  }

}

async function getApiServerResult(objectForThis: any, apiService: (params: any) => Observable<any>, params: any): Promise<any> {
  return new Promise((res, rej) => {
    const service = apiService.bind(objectForThis);
    service(params)
      .subscribe((data: any) => {
        res(data);
      }, err => {
        rej(err);
      });
  });
}

function generateTopic(length: number): string {
  let text = '';
  const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

  for (let i = 0; i < length; i++)
    text += possible.charAt(Math.floor(Math.random() * possible.length));

  return text;
}

// read app at local
// make run button and params
// send rest api
